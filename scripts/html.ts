# HTML Transformations go here

$("/html") {
  add_canonical_tag()
  rewrite_links()

  add_assets()


  @import "sections/header.ts"
  @import "sections/footer.ts"

  @import "mappings.ts"

}
