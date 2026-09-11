require 'socket'

# High-compatibility local development server for Safari & Chrome
# Avoids macOS kernel sendfile Errno::EPERM issues by using File.binread
$stdout.sync = true
port = 8080
server = TCPServer.new('127.0.0.1', port)
puts "================================================="
puts "  Harmonix Sound HTTP Server running!"
puts "  Access URL: http://localhost:#{port}"
puts "================================================="

MIME_TYPES = {
  '.html' => 'text/html; charset=utf-8',
  '.css'  => 'text/css; charset=utf-8',
  '.js'   => 'application/javascript; charset=utf-8',
  '.json' => 'application/json; charset=utf-8',
  '.png'  => 'image/png',
  '.jpg'  => 'image/jpeg',
  '.jpeg' => 'image/jpeg',
  '.svg'  => 'image/svg+xml',
  '.ogg'  => 'audio/ogg',
  '.mp3'  => 'audio/mpeg',
  '.wav'  => 'audio/wav',
  '.woff2'=> 'font/woff2'
}

loop do
  Thread.start(server.accept) do |client|
    begin
      headers = []
      while (line = client.gets)
        line = line.chomp("\r\n").chomp("\n")
        break if line.empty?
        headers << line
      end

      if headers.empty?
        client.close
        next
      end

      request_line = headers.first
      method, full_path = request_line.split[0..1]
      path = (full_path || '/').split('?').first
      path = '/index.html' if path == '/'

      file_path = File.join(Dir.pwd, path)

      if File.file?(file_path)
        file_size = File.size(file_path)
        ext = File.extname(file_path).downcase
        content_type = MIME_TYPES[ext] || 'application/octet-stream'

        range_header = headers.find { |h| h =~ /^Range:\s*bytes=(\d*)-(\d*)/i }

        if range_header && range_header =~ /^Range:\s*bytes=(\d*)-(\d*)/i
          start_str, end_str = $1, $2
          start_pos = start_str.empty? ? 0 : start_str.to_i
          end_pos = end_str.empty? ? (file_size - 1) : end_str.to_i
          end_pos = file_size - 1 if end_pos >= file_size
          length = end_pos - start_pos + 1

          client.print "HTTP/1.1 206 Partial Content\r\n"
          client.print "Content-Type: #{content_type}\r\n"
          client.print "Content-Range: bytes #{start_pos}-#{end_pos}/#{file_size}\r\n"
          client.print "Content-Length: #{length}\r\n"
          client.print "Accept-Ranges: bytes\r\n"
          client.print "Access-Control-Allow-Origin: *\r\n"
          client.print "Cache-Control: no-cache\r\n"
          client.print "Connection: close\r\n\r\n"

          if method != 'HEAD'
            File.open(file_path, 'rb') do |f|
              f.seek(start_pos)
              bytes_left = length
              while bytes_left > 0
                chunk_size = [bytes_left, 65536].min
                data = f.read(chunk_size)
                break unless data
                client.write data
                bytes_left -= data.bytesize
              end
            end
          end
        else
          client.print "HTTP/1.1 200 OK\r\n"
          client.print "Content-Type: #{content_type}\r\n"
          client.print "Content-Length: #{file_size}\r\n"
          client.print "Accept-Ranges: bytes\r\n"
          client.print "Access-Control-Allow-Origin: *\r\n"
          client.print "Cache-Control: no-cache\r\n"
          client.print "Connection: close\r\n\r\n"

          if method != 'HEAD'
            File.open(file_path, 'rb') do |f|
              while (chunk = f.read(65536))
                client.write chunk
              end
            end
          end
        end
      else
        client.print "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: 9\r\nConnection: close\r\n\r\nNot Found"
      end
    rescue => e
      # ignore connection resets
    ensure
      client.close rescue nil
    end
  end
end
