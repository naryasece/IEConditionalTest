# The main file executed by Tritium. The start of all other files.
%IEVersion = ""
$user_agent {
  capture(/MSIE\s*([\d]+)/) {
    %IEVersion { set(%1)}
  }
}

capture(/(<\!--[^>]+>)\s*(<[^>]+>)+\s(<![^>]+-->)/) {
  %openIf = %1 # %1 open if tag
  %conditionalHTML = %2 # %2 conditional HTML
  %closingTag # %3 closing tag
  log(%1)
  log(%2)
  log(%3)

  %keepConditional = "true"

  %openIf {
    #split ORs
    capture(/\[\s*if\s*([^|]+)\]/) {
      
    }
  }

  match(%keepConditional, /true/) {
    %1 { set("") }
    %2 { set("") }
    %3 { set("") }
    # set(concat(%1,%2,%3))
  }
  
}

match(inferred_content_type()) {
  with(/html/) {

    protect_xmlns()

    # Force UTF-8 encoding. If you'd like to auto-detect the encoding,
    # simply remove the "UTF-8" argument.  e.g. html(){ ... }
    html("UTF-8") {
      @import "html.ts"
    }

    restore_xmlns()

    restore_dollar_sign()
  }
  
  else() {
    log("Passing through " + $content_type + " unmodified.")
  }
}
