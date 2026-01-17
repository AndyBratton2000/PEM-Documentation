-- rewrite-md-links.lua
-- Rewrite links ending in .md /.MD to .html, preserving anchors and queries.

function Link(el)
  local t = el.target

  -- Skip absolute URLs (http:, https:, mailto:, etc.)
  if t:match("^[%a%+%-%.]+:") then
    return el
  end

  -- Uncomment these lines if you want debug output to stderr:
  -- io.stderr:write("Before: " .. t .. "\n")

  -- Case 1: foo.md#anchor  -> foo.html#anchor
  t = t:gsub("(%.[Mm][Dd])(%#.*)$", ".html%2")

  -- Case 2: foo.md?query   -> foo.html?query
  t = t:gsub("(%.[Mm][Dd])(%?.*)$", ".html%2")

  -- Case 3: plain foo.md   -> foo.html
  t = t:gsub("%.[Mm][Dd]$", ".html")

  -- io.stderr:write("After:  " .. t .. "\n\n")

  el.target = t
  return el
end
