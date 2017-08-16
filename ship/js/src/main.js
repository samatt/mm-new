var $loader,    $enter,     $where,
  $what,      $from,      $shipping,
  $yourProduct, $goSwimming,  $swimSuit,
  $form,      $thankYou,    $about

var $doc

var $whereFlag,   $fromFlag,    $productIcon,
  $whereGradient, $fromGradient,  $iconGrid,
  $ships,     $theProduct

var animDurationSeconds = 2

var $currentPage, lastCpi, cpi, pages = []

var countries = {}, countriesArray = []

var currentItem, iconIdArray = []

var currentCountry, fromCountry

var spriteSheets = []

var spriteSheetWidth = 1980, spriteSheetHeight = 570, iconWidth = iconHeight = 30

var loadingImage = new Image()

var r = new Random()
var db_url = 'https://moreandmorestore.herokuapp.com/api/'
// http://moreandmorestore.herokuapp.com/api/
var isMobile = false // initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true

var init = function () {
  $doc = $(document)

  loadingImage.src = 'img/loading.gif'

  setVars()
  getCurrentPage()

  initControls()
  initEnter()
  initWhere()
  initWhat()
  initFrom()
  initShipping()
  initYourProduct()
  initGoSwimming()
  initSwimSuit()
  initForm()
  initThankYou()
  initAbout()

  loadSpriteSheets(function () {
    $loader.hide()
  })
}

var loadSpriteSheets = function (cb) {
  var ssCounter = 0
  var numberOfSheets = 1

  for ( var i = 0; i <= 0; i++) {
    var newSpriteSheet = new Image()
    newSpriteSheet.onload = function () {
      spriteSheets.push(newSpriteSheet)
      ssCounter++
      if (ssCounter === numberOfSheets) {
        if (cb) cb()
      }
    }
    newSpriteSheet.src = 'img/spritesheets/moreandmore_spritesheets' + i + '.png'
  }
}

var setVars = function () {

  // countryMap defined in lib folder in file named thusly
  // productSource defined in lib folder in file named thusly

  $loader = // |
    $enter = // |
      $where = // |
        $what = // |
          $from = // |
            $shipping = // |
              $yourProduct = // |
                $goSwimming = // |
                  $swimSuit = // |
                    $form = // |
                      $thankYou = // V
                        $about = false

  //
                        // dom elements

  $loader = $('#loader')
  $whereFlag = $('#where-flag')
  $fromFlag = $('#from-flag')
  $whereGradient = $('#where-gradient')
  $whereGradient.colors = {}
  $fromGradient = $('#from-gradient')
  $fromGradient.colors = {}
  $iconGrid = $('#icon-grid')
  $ships = $('.ship')
  $theProduct = $('#the-product')
  $toolTip = $('#tool-tip')

  //
  // pages

  $enter = $('#enter')
  $where = $('#where')
  $what = $('#what')
  $from = $('#from')
  $shipping = $('#shipping')
  $yourProduct = $('#your-product')
  $goSwimming = $('#go-swimming')
  $swimSuit = $('#swim-suit')
  $form = $('#form')
  $thankYou = $('#thank-you')
  $about = $('#about')

  // CPI
  pages.push($enter) // 0
  pages.push($where) // 1
  pages.push($what) // 2
  pages.push($from) // 3
  pages.push($shipping) // 4
  pages.push($yourProduct) // 5
  pages.push($goSwimming) // 6
  pages.push($swimSuit) // 7
  pages.push($form) // 8
  pages.push($thankYou) // 9
  pages.push($about) // 10

}

var buildWhereCountries = function (cb) {
  var whereCountriesID = [ 'bra', 'usa', 'rus', 'mex', 'ind', 'chn', 'jpn', 'tur' ]

  for ( var i = 0; i < whereCountriesID.length; i++) {
    var thisCID = whereCountriesID[ i ]
    var country = countryMap[ thisCID ]
    if (!country) continue
    var $opt = $('<option></option>')
    $opt.text(country.name)
    $opt.val(country._id)
    $whereSelect.append($opt)
  }

  if (cb) cb()
}

var buildFromCountries = function (cid, pid) {
  var destCountries = productSource[ pid ]
  var theseCountries
  for ( var i = 0; i < destCountries.length; i++) {
    var thisCountry = destCountries[ i ]
    if (thisCountry.dst === cid) {
      theseCountries = thisCountry.possible_srcs
    }
  }

  theseCountries.sort()

  for ( var i = 0; i < theseCountries.length; i++) {
    var thisCID = theseCountries[ i ]
    var country = countryMap[ thisCID ]
    if (!country) continue
    var $opt = $('<option></option>')
    $opt.text(country.name)
    $opt.val(country._id)
    $fromSelect.append($opt)
  }
}

var initControls = function () {
  $doc.on('click touchstart', '.about-link', function () {
    event.preventDefault()

    resetAll()

    if ($currentPage != $enter) {
      $enter.siblings('.page').each(function () { $(this).hide() })

      showPage({ $page: $enter })
    }
  })

  $doc.on('click touchstart', '.home-link', function () {
    event.preventDefault()

    showPage({ $page: $about })
  })

  $doc.on('click touchstart', '.where-flag', function () {
    event.preventDefault()

    showPage({ $page: $where })
  })

  $doc.on('click touchstart', '.icon-wrap', function () {
    event.preventDefault()

    if (!currentCountry) {
      showPage({ $page: $where })
    } else {
      showPage({ $page: $what })
    }
  })

  $doc.on('click touchstart', '.from-flag', function () {
    event.preventDefault()

    if (!currentCountry) {
      showPage({ $page: $where })
    } else if (!currentItem) {
      showPage({ $page: $what })
    } else {
      showPage({ $page: $from })
    }
  })
}

//
// ENTER PAGE
//

var initEnter = function () {
  moveShips(100, 10000)

  // ENTER WHERE ARE YOU
  $doc.on('click touchstart', '.enter-btn', function () {
    event.preventDefault()

    TweenMax.to($enter[ 0 ], animDurationSeconds, {
      left: '-100%'
    })

    toggleControls(true)

    // TweenMax.to( $( '.more-loop img '), animDurationSeconds / 2, {
    //  position: "fixed",
    //  width: "90px",
    //  marginTop: "-70%",
    //  left: "100%",
    //  opacity: .5,
    //  onCompleteParams: [ $( '.more-loop img ') ],
    //  onComplete: function( $loop ) {
    //    toggleControls( true )
    //    $loop.css({
    //      position: "inherit",
    //      width: "auto",
    //      marginTop: "0",
    //      left: "0%",
    //      opacity: 1
    //    })
    //  }
    // } )

    showPage({ $page: $where })
  })
}

//
// WHERE PAGE
//
var initWhere = function () {

  // ENTER WHERE ARE YOU
  $doc.on('click touchstart', '#where .next-btn', function (event) {
    event.preventDefault()

    if ($(event.currentTarget).hasClass('disabled')) return

    TweenMax.to($enter[ 0 ], animDurationSeconds, {
      left: '-100%'
    })

    showPage({ $page: $what })
  })

  $whereSelect = $('#where-select')

  buildWhereCountries()

  $whereSelect.select2({
    placehoder: 'Select a Country',
    minimumResultsForSearch: -1,
    width: 'style'

  })

  $whereSelect.on('select2:select', function (e) {
    var name = e.params.data.text
    var next = $(e.target).parents('.page').find('.next-btn')
    if (next.hasClass('disabled')) next.removeClass('disabled')
    makeFlagIcon('where', e.params.data.id)

    currentCountry = {}
    currentCountry.name = name
    currentCountry.id = e.params.data.id

    // ADD GRADIENT AS SECOND VARIABLE
    updateGradient($whereGradient, currentCountry.name)
  })

  updateGradient($whereGradient)
}

//
// WHAT PAGE
//

var initWhat = function () {
  $doc.on('click touchstart', '.next-item', function () {
    event.preventDefault()

    var activeItem = $what.find('.active.item')
    var nextItem
    activeItem.removeClass('active')
    activeItem.next().length > 0 ? nextItem = activeItem.next() : nextItem = $what.find('.item:first')
    // WRITE TWEENS HERE
    TweenMax.to(activeItem[ 0 ], animDurationSeconds, { x: '-200%', opacity: 0})
    nextItem.addClass('active')

    activeItem = $what.find('.active.item')
    currentItem = {}
    currentItem.name = activeItem.data('product-name')
    currentItem.id = activeItem.data('product-id')
    var $thisImg = $(activeItem.find('img'))
    var inContainerSrc = $thisImg.attr('src').replace('big-icons', 'in-containers')
    $('#icon-wrap').html('')
    $('.cargo:first').html('')
    $('.cargo:last').html('')
    $('#the-product').html('')
    $thisImg.clone().hide().appendTo('#icon-wrap').delay(50).fadeIn('slow')
    $thisImg.clone().hide().appendTo('#the-product').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:first').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:last').delay(50).fadeIn('slow')

    TweenMax.fromTo(nextItem[ 0 ], animDurationSeconds, { x: '200%', opacity: 0 }, { x: '0%', opacity: 1 })
  })

  $doc.on('click touchstart', '.prev-item', function () {
    event.preventDefault()

    var activeItem = $what.find('.active.item')
    var prevItem
    activeItem.removeClass('active')
    activeItem.prev().length > 0 ? prevItem = activeItem.prev() : prevItem = $what.find('.item:last')
    // WRITE TWEENS HERE
    TweenMax.to(activeItem[ 0 ], animDurationSeconds, { x: '200%', opacity: 0})
    prevItem.addClass('active')

    activeItem = $what.find('.active.item')
    currentItem = {}
    currentItem.name = activeItem.data('product-name')
    currentItem.id = activeItem.data('product-id')
    var $thisImg = $(activeItem.find('img'))
    var inContainerSrc = $thisImg.attr('src').replace('big-icons', 'in-containers')
    $('#icon-wrap').html('')
    $('.cargo:first').html('')
    $('.cargo:last').html('')
    $('#the-product').html('')
    $thisImg.clone().hide().appendTo('#icon-wrap').delay(50).fadeIn('slow')
    $thisImg.clone().hide().appendTo('#the-product').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:first').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:last').delay(50).fadeIn('slow')

    TweenMax.fromTo(prevItem[ 0 ], animDurationSeconds, { x: '-200%', opacity: 0 }, { x: '0%', opacity: 1 })
  })

  $doc.on('click touchstart', '#what .next-btn', function (event) {
    event.preventDefault()

    var activeItem = $what.find('.active.item')
    currentItem = {}
    currentItem.name = activeItem.data('product-name')
    currentItem.id = activeItem.data('product-id')
    var $thisImg = $(activeItem.find('img'))
    var inContainerSrc = $thisImg.attr('src').replace('big-icons', 'in-containers')
    $('#icon-wrap').html('')
    $('.cargo:first').html('')
    $('.cargo:last').html('')
    $('#the-product').html('')
    $thisImg.clone().hide().appendTo('#icon-wrap').delay(50).fadeIn('slow')
    $thisImg.clone().hide().appendTo('#the-product').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:first').delay(50).fadeIn('slow')
    $thisImg.clone().attr('src', inContainerSrc).hide().appendTo('.cargo:last').delay(50).fadeIn('slow')

    buildFromCountries(currentCountry.id, currentItem.id)

    showPage({ $page: $from })
  })
}

//
// FROM PAGE
//

var initFrom = function () {
  $fromSelect = $('#from-select')

  $fromSelect.select2({
    placehoder: 'Select a Country',
    minimumResultsForSearch: -1,
    width: 'style'

  })

  $fromSelect.on('select2:select', function (e) {
    var name = e.params.data.text
    var next = $(e.target).parents('.page').find('.next-btn')
    if (next.hasClass('disabled')) next.removeClass('disabled')
    makeFlagIcon('from', e.params.data.id)
    fromCountry = {}
    fromCountry.name = name
    fromCountry.id = e.params.data.id
    $('#from .next-btn').html("I'VE SELECTED MY EXPORTER")
  })

  $doc.on('click touchstart', '#from .next-btn', function () {
    event.preventDefault()

    // clear grid
    $iconGrid.html('')

    $('#from .next-btn').html(loadingImage)

    getIcons(function () {
      $iconGrid.append("<div id='grid-banner' class='banner' ><CENTER>RUNNING CONTAINER SORT ALGORITIHM</CENTER></div>")
      makeIconGrid()

      showPage({ $page: $shipping })

      setTimeout(function () {
        $('#from .next-btn').html("I'VE SELECTED MY EXPORTER")
      })
    })
  })
}

//
// SHIPPING PAGE
//
var makeIconGrid, getIcons

var initShipping = function () {
  getIcons = function (cb) {
    $.ajax({
      method: 'GET',
      url: db_url + 'products/' + fromCountry.id + '/' + currentCountry.id,
      success: function (data) {
        iconIdArray = data
        console.log(iconIdArray.length)
        if (cb) cb()
      }
    })
  }

  //
  // ICON GRID
  //

  makeIconGrid = function (isInstant, cb) {
    var thisIconId = iconIdArray[ Math.floor(iconIdArray.length * Math.random()) ]
    var thisIcon = icons[ thisIconId ]
    var thisSprite = thisIcon.sprite
    var thisSheet = thisSprite.spritesheet.slice(-5, -4)
    var newIconWrap = document.createElement('div')

    newIconWrap.classList.add('grid-icon-wrap')
    var newIcon = document.createElement('div')
    newIcon.classList.add('grid-icon')
    newIcon.style.backgroundImage = 'url( ' + spriteSheets[ thisSheet ].src + ' )'
    newIcon.style.backgroundPositionX = '' + (-thisSprite.frame.x - spriteSheetWidth) + 'px'
    newIcon.style.backgroundPositionY = '' + (-thisSprite.frame.y + spriteSheetHeight) + 'px'
    // newIcon.style.backgroundSize = '' + thisSprite.frame.w + 'px ' + thisSprite.frame.h + 'px '
    // newIcon.style.height = "100%"
    // newIcon.style.width = "100%"
    // newIcon.style.paddingBottom = ( thisSprite.frame.h / thisSprite.frame.w ) * 100 + '%'

    if (thisSprite.rotated) newIcon.classList.add('rotated')
    // need name here
    newIcon.dataset.product = thisIcon._id
    newIconWrap.appendChild(newIcon)

    if ($iconGrid.height() < window.innerHeight - 200) {
      $iconGrid.prepend(newIconWrap)
      $iconGrid.remove('#grid-banner')
      if ($iconGrid.height() >= window.innerHeight - 200) {
        $iconGrid.children().last().remove()
        if ($currentPage === $shipping) {
          showPage({ $page: $yourProduct, cb: overlayProduct })
        }
        if (cb) cb()
        return
      }
      isInstant ? makeIconGrid(true, cb) : setTimeout(makeIconGrid, 30)
    } else {
      if ($currentPage === $shipping) {
        showPage({ $page: $yourProduct, cb: overlayProduct })
      }
      if (cb) cb()
      return
    }

    newIconWrap.onclick = function (event) {
      event.preventDefault()

      setSwimText()

      showPage({
        $page: $goSwimming
      })
    }

    newIconWrap.onmouseover = newIconWrap.ontouchstart = function () {
      event.preventDefault()

      $toolTip.show()
      $toolTip.html('Your ' + capitalize(currentItem.name) + ' from ' + capitalize(fromCountry.name) + ' came to ' + capitalize(currentCountry.name) + ' with ' + capitalize(iconNames[ newIcon.dataset.product ]) + '(' + newIcon.dataset.product + ').')
      if (isMobile) {
        var nextButton = document.createElement('div')
        nextButton.id = 'mobile-next'
        nextButton.classList.add('mobile-next')
        nextButton.innerHTML = 'NEXT'
        nextButton.ontouchstart = function () {
          setSwimText()
          showPage({
            $page: $goSwimming
          })
        }

        $toolTip.append(nextButton)
      }
    }

    newIconWrap.onmouseout = function () {
      $toolTip.hide()
    }
  }
}

//
// PRODUCT PAGE
//
var overlayProduct
var initYourProduct = function () {
  $doc.on('click', '#the-product', function () {
    event.preventDefault()

    setSwimText()

    showPage({
      $page: $goSwimming
    })
  })

  //
  // CHECK IMAGE OVERLAPS
  //

  overlayProduct = function (cb) {
    var icons = $iconGrid.children()
    var theProductRect = $theProduct[ 0 ].getBoundingClientRect()
    theProductRect.is = new AABB(theProductRect)
    for ( var i = 0; i < icons.length; i++) {
      var $icon = $(icons[ i ])
      $icon.removeClass('nopacity')
      var iconRect = $icon[ 0 ].getBoundingClientRect()
      if (theProductRect.is.colliding(iconRect)) {

        // $icon.addClass( 'nopacity' )

      }
    }

    if (cb) cb()
  }
}

//
// GO SWIMMING
//

var initGoSwimming = function () {
  $doc.on('click touchstart', '#need-swimsuit', function () {
    event.preventDefault()

    makeIconGrid(true, function () {
      overlayProduct(function () {
        setTimeout(function () {
          $('#ocean-overlay').fadeOut()
        }, 400)
      })
    })
    showPage({ $page: $swimSuit })
  })
}

//
// SWIMSUIT
//

var initSwimSuit = function () {
  $doc.on('click touchstart', '#buy-it', function () {
    event.preventDefault()

    showPage({ $page: $form })
  })
}

//
// FORM
//

var initForm = function () {
  $doc.on('submit', '#the-form', function (event) {
    event.preventDefault()
    // AJAX ORDER DATA HERE
    // toCountry
    // fromCountry
    // currentItem
    var name = $('#name').val()
    var email = $('#email').val()
    var emailTwo = $('#confirm-email').val()
    var phone = $('#phone').val()

    if (email != emailTwo) {
      alert("Those emails don't match!")
      return false
    }

    $.post(db_url + 'order', { name: name, email: email,from: fromCountry.id, where: currentCountry.id,  product: currentItem.id })
      .done(function (data) {
        showPage({ $page: $thankYou })
      })

    return false
  })
}

//
// THANK YOU
//

var initThankYou = function () {}

var initAbout = function () {
  $doc.on('click touchstart', '#about', function () {
    event.preventDefault()

    showPage({ $page: pages[ lastCpi ]})
  })
}

//
// PAGE TRANSITION FUNCTIONS
//

var setCurrentPage = function (page) {
  if (lastCpi !== cpi) lastCpi = cpi || pages.indexOf($currentPage)
  $currentPage = page
  cpi = pages.indexOf($currentPage)

  if ($currentPage !== $enter) {
    window.history.pushState({ }, '', location.origin + location.pathname + '#' + $currentPage[ 0 ].id)
  } else {
    window.history.pushState({ }, '', location.origin + location.pathname)
    toggleControls(false)
  }

  handleProgression()
}

//
// PAGE LOAD FUNCTIONS
//

var getCurrentPage = window.onpopstate = function () {

  // console.log( window.location.hash )

  var thisHash = window.location.hash.substr(1)

  if (thisHash.length < 1) {
    setCurrentPage($enter)
    showPage({ $page: $enter })
    return
  }

  for ( var i = 0; i < pages.length; i++) {
    var $page = pages[ i ]
    if (thisHash === $page[ 0 ].id) {
      if (!currentCountry && cpi !== 10 & cpi > 1) {
        showPage({ $page: $where })
        return
      }

      if (!currentItem && cpi !== 10 & cpi > 2) {
        showPage({ $page: $what })
        return
      }

      if (!fromCountry && cpi !== 10 & cpi > 3) {
        showPage({ $page: $from })
        return
      }

      showPage({ $page: $page })
    }
  }
}

var reverseShow = function ($page) {
  var trans = {}
  trans.in = $page[ 0 ].dataset.transIn || 'slideLeft'
  trans.out = $page[ 0 ].dataset.transOut || 'slideLeft'

  var onCompleteReverseShow = function () {
    $page.hide()
  }

  if (trans.in === 'slideLeft') {
    TweenMax.fromTo($page[ 0 ], animDurationSeconds, {
      left: '0%'
    }, {
      left: '100%',
      onComplete: onCompleteReverseShow
    })
  } else if (trans.in === 'fade') {
    TweenMax.fromTo($page[ 0 ], animDurationSeconds, {
      opacity: '1'
    }, {
      opacity: '0',
      onComplete: onCompleteReverseShow
    })
  }
}

var showPage = function (options) {
  var opt = options || {}
  var $page = opt.$page || {}
  var cb = opt.cb || function () {}
  var nextTrans = {}
  nextTrans.in = $page[ 0 ].dataset.transIn || 'slideLeft'
  nextTrans.out = $page[ 0 ].dataset.transOut || 'slideLeft'
  var lastTrans = {}
  if ($currentPage) {
    lastTrans.in = $currentPage[ 0 ].dataset.transIn || 'slideLeft'
    lastTrans.out = $currentPage[ 0 ].dataset.transOut || 'slideLeft'
  }

  var onCompleteExit = function ($thisPage) {
    $thisPage.hide()
  }

  var onCompleteEntrance = function () {
    // setCurrentPage( $page )
    if (cb) cb()
  }

  if ($currentPage) {
    if (lastTrans.out === 'slideLeft') {
      TweenMax.fromTo($currentPage[ 0 ], animDurationSeconds, {
        left: '0%'
      }, {
        left: '-100%',
        onComplete: onCompleteExit,
        onCompleteParams: [ $currentPage ]
      })
    } else if (lastTrans.out === 'fade') {
      TweenMax.fromTo($currentPage[ 0 ], animDurationSeconds, {
        opacity: '1'
      }, {
        opacity: '0',
        onComplete: onCompleteExit,
        onCompleteParams: [ $currentPage ]
      })
    }
  }

  $page.show()

  // update current page after animations are initialized
  setCurrentPage($page)

  if (nextTrans.in === 'slideLeft') {
    TweenMax.fromTo($page[ 0 ], animDurationSeconds, {
      left: '100%'
    }, {
      left: '0%',
      opacity: '1',
      onComplete: onCompleteEntrance
    })
  } else if (nextTrans.in === 'fade') {
    TweenMax.fromTo($page[ 0 ], animDurationSeconds, {
      opacity: '0'
    }, {
      opacity: '1',
      left: '0%',
      onComplete: onCompleteEntrance
    })
  }
}

var handleProgression = function () {

  // cpi === $currentPageIndex
  //
  console.log('lastCpi = ' + lastCpi)
  console.log('cpi = ' + cpi)

  if (cpi === 0) {
    toggleControls()
  }

  // before shipping
  if (cpi < 4) {
    $iconGrid.hide()
  } else {
    $iconGrid.show()
  }

  //
  if (cpi <= 6) {
    if (!$theProduct.hasClass('larger')) {
      $theProduct.addClass('larger')
    }
  } else {
    if ($theProduct.hasClass('larger')) {
      $theProduct.removeClass('larger')
    }
  }

  if (lastCpi > cpi) {
    var cpiCounter = lastCpi
    while(cpiCounter > cpi) {
      var $thisPage = pages[ cpiCounter ]
      reverseShow($thisPage)
      cpiCounter--
    }
  }
}

var toggleControls = function (show) {
  if (show) {
    if (!$('.control').is(':visible')) $('.control').fadeIn()
  } else {
    $('.control').hide()
  }
}

//
// FLAG AND GRADIENT FUNCTIONS
//

var makeFlagIcon = function (type, cid) {
  var newFlag = new Image()
  newFlag.onload = function () {
    $(newFlag).hide()
    $('#' + type + '-flag').html(newFlag)
    $('#' + type + '-flag').css({ backgroundColor: 'transparent' })
    $(newFlag).fadeIn()
  }
  newFlag.src = countryMap[ cid ].flag
}

var resetAll = function () {
  fromCountry = currentCountry = currentItem = false

  $whereFlag.html('').css('background-color', 'rgba(0, 0, 0, 0.8)')
  $fromFlag.html('').css('background-color', 'rgba(0, 0, 0, 0.8)')
  $('#icon-wrap').html('').css('background-color', 'rgba(0, 0, 0, 0.8)')

  $whereSelect.val('default').trigger('change')
  $fromSelect.val('default').trigger('change')
}

var countryGradientNames = [ 'usa', 'turkey', 'mexico', 'china', 'japan', 'brazil', 'russia' ]

var updateGradient = function (element, countryName) {
  if (countryName) {
    if (countryName === 'United States') countryName = 'usa'
    var c = countryName.toLowerCase()
    if (element.countryName) element[ 0 ].classList.remove(element.countryName)
    element[ 0 ].classList.add(c)
    element.countryName = c
  } else {
    var c = countryGradientNames[ r.integer(0, countryGradientNames.length - 1) ]
    if (element.countryName) element[ 0 ].classList.remove(element.countryName)
    element.countryName = c
    element[ 0 ].classList.add(c)
  }
}

//
// SHIP ANIMATIONS
//

var moveShips = function (time, amount) {
  for ( var i = 0; i < $ships.length; i++) {
    var ship = $ships[ i ]
    var mult = 1
    if (i === 0) mult = -1
    var tweenTime = time * animDurationSeconds * ((Math.random() + 1) * 8)
    ship.tween = TweenMax.to(ship, tweenTime, {
      x: '-=' + amount * mult,
      onUpdateParams: [ ship, mult ],
      onUpdate: function (ship, mult) {
        var rect = ship.getBoundingClientRect()
        if (rect.left < -1000 && mult === 1) {
          TweenMax.set(ship, { x: window.innerWidth + 400 })
          ship.tween.updateTo({ x: -500 }, true).play()
        } else if (rect.left > window.innerWidth + 1000 && mult === -1) {
          TweenMax.set(ship, { x: -800 })
          ship.tween.updateTo({ x: window.innerWidth + 500 }, true).play()
        }
      }
    })
  }
}

//
// RESIZE
//

var resize = function () {
  if (location.hash.substr(1) === 'shipping') {
    $iconGrid.html('')
    makeIconGrid()
  }

  if (location.hash.substr(1) === 'your-product') {
    makeIconGrid()
    overlayProduct()
  }
}

//
// MOUSE MOVE
//

var moveMouse = function (event) {
  if (typeof $toolTip !== 'undefined' && isMobile === false) $toolTip.css({ left: event.clientX, top: event.clientY })
}

//
// capitalize
//

var capitalize = function (str) {
  return str.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

//
// set swim text
//
var setSwimText = function () {
  if (isMobile) {
    $toolTip.hide()
  }
  $('#country-name').text('A CONTAINER SHIP BROUGHT YOU THESE PRODUCTS FROM ' + fromCountry.name + '. BUY A SWIMSUIT & JOIN THEM IN THE SEA.')
}

window.onmousemove = moveMouse
window.onresize = resize
window.onload = init
