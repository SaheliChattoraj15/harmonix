# Standalone Production Bundle Builder for Harmonix Sound
# Concatenates modular ES scripts into an IIFE bundle for file:/// and http:// compatibility

FILES = [
  'js/data.js',
  'js/storage.js',
  'js/os.js',
  'js/palette.js',
  'js/audio.js',
  'js/visualizer.js',
  'js/lyrics.js',
  'js/pip.js',
  'js/ui.js',
  'js/app.js'
]

output_lines = []
output_lines << "/* Harmonix Sound - Standalone Production Bundle with Cross-Platform OS Engine */"
output_lines << "(function() {"

FILES.each do |filepath|
  puts "Bundling #{filepath}..."
  content = File.read(filepath, encoding: 'UTF-8')

  # Remove import statements
  content.gsub!(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/m, '')
  
  # Remove export statements but preserve declarations
  content.gsub!(/^\s*export\s+default\s+/m, '')
  content.gsub!(/^\s*export\s+class\s+/m, 'class ')
  content.gsub!(/^\s*export\s+const\s+/m, 'const ')
  content.gsub!(/^\s*export\s+function\s+/m, 'function ')
  content.gsub!(/^\s*export\s+let\s+/m, 'let ')
  content.gsub!(/^\s*export\s*\{[^}]*\};?\s*$/m, '')

  output_lines << "\n/* --- #{File.basename(filepath)} --- */\n"
  output_lines << content.strip
end

output_lines << "\n})();\n"

bundle_path = 'js/app.bundle.js'
File.write(bundle_path, output_lines.join("\n"), encoding: 'UTF-8')
puts "Successfully built #{bundle_path} (#{File.size(bundle_path)} bytes)"

