
/**
 * Utility to fix common issues with AI-generated Markdown
 */
export function fixMarkdown(rawMarkdown) {
  let fixedMarkdown = rawMarkdown;
  
  // Step 1: Remove surrounding quotes if present
  fixedMarkdown = fixedMarkdown.replace(/^["']|["']$/g, '');
  
  // Step 2: Fix escaped newlines (\n) by replacing them with actual newlines
  fixedMarkdown = fixedMarkdown.replace(/\\n/g, '\n');
  
  // Step 3: Ensure proper spacing for headers (# Header instead of #Header)
  fixedMarkdown = fixedMarkdown.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');
  
  // Step 4: Fix list items to ensure proper spacing
  fixedMarkdown = fixedMarkdown.replace(/^([*+-])([^\s])/gm, '$1 $2');
  
  // Step 5: Escape any unescaped special Markdown characters that aren't being used for formatting
  // This is complex and situation-dependent, but here are some common fixes:
  
  // Fix asterisks used within text (not for emphasis)
  fixedMarkdown = fixedMarkdown.replace(/(\w)\*(\w)/g, '$1\\*$2');
  
  // Fix underscores used within text (not for emphasis)
  fixedMarkdown = fixedMarkdown.replace(/(\w)_(\w)/g, '$1\\_$2');
  
  // Step 6: Remove any unnecessary escaping of characters
  fixedMarkdown = fixedMarkdown.replace(/\\([^*_`#~[\]()+-])/g, '$1');
  
  // Step 7: Fix code blocks that might have incorrect formatting
  fixedMarkdown = fixedMarkdown.replace(/```(\w+)?(?!\n)/g, '```$1\n');
  fixedMarkdown = fixedMarkdown.replace(/(?<!\n)```/g, '\n```');
  
  // Step 8: Ensure proper blank lines before and after headers and lists for better rendering
  fixedMarkdown = fixedMarkdown.replace(/^(#{1,6}.*)\n([^#\n])/gm, '$1\n\n$2');
  fixedMarkdown = fixedMarkdown.replace(/([^*\n-])\n^([*+-])/gm, '$1\n\n$2');
  
  return fixedMarkdown;
}
