window.onload = () => {
    //keep a redundance to prevent crash when user start overlay before control panel 
    const overlayOptions = {
        "screen": {
            "screenWidth": 1920,
            "screenHeight": 1080,
            "screenBgcolor": "rgba(0,0,0,0)",
        },
        "list": {
            "listWidht": 500,
            "listHeight": 700,
            "listBgColor": "rgba(211, 118, 177, 1)",
            "listColumnPosition": "flex-start",
            "listLinePosition": "flex-start",
            "marginTop": 0,
            "marginBottom": 0,
            "marginLeft": 0,
            "marginRight": 0,
        },
        "listHeader": {
            "showListHeader": true,
            "listHeaderName1": "Requester",
            "listHeaderName2": "Music",
            "listHeaderFontSize": 18,
            "listHeaderFontColor": "rgba(255, 255, 255, 1)",
            "listHeaderBgColor": "rgba(36, 176, 237, 1)"
        },
        "listTitle": {
            "showTitle": true,
            "titleText": "Musics",
            "titleFontSize": 20,
            "titleFontColor": "rgba(176, 197, 207, 1)",
            "titleBgColor": "rgba(0,0,0,1)"
        },
        "listItems": {
            "showIndex": true,
            "itemsDefaultColor": "rgba(0,0,0,1)",
            "itemsFontSize": 18
        },
        "higlight": {
            "higlightFontSize": 20,
            "higlightFontColor": "rgba(255,23,229,1)",
            "higlightBgColor": "rgba(227,255,0,1)",
        },
        "animations": {
            "addItemAnimation": true,
            "addItemAnimationType": "flipIn",
            "removeItemAnimation": true,
            "removeItemAnimationType": "slideRight",
            "changePositionAnimation": true
        }
    }
    const storagePrefix = 'LO_'
    const tabComunication = new BroadcastChannel(`${storagePrefix}tabComunication`)

    var mainContainer = document.querySelector('#main-container')
    var listTitle = document.querySelector('#list-title')
    var listFirstField = document.querySelector('#list-head-first-field')
    var listSecondField = document.querySelector('#list-head-second-field')
    var tableBody = document.querySelector('#list-body')
    var tableContainer = document.querySelector('#table-container')
    var tableHeader = document.querySelector('thead')
    var listIndex = () => document.querySelectorAll('.list-header-index')
    var higlights = () => document.querySelectorAll('.higlight')
    var listItens = () => document.querySelectorAll('.list-item')

    function drawOverlayList() {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let tableBodyHTML = ``

        listTitle.textContent = options.listTitle.titleText
        listFirstField.textContent = options.listHeader.listHeaderName1
        listSecondField.textContent = options.listHeader.listHeaderName2

        list.forEach((listItem, index) => {
            tableBodyHTML += `
                <tr class="list-item ${listItem.higlight ? 'higlight' : ''}${index == 0 ? ' fist-item' : ''}">
                    <th class="list-header-index" scope="row">${parseInt(index) + 1}</th>                     
                    <td>${listItem.firstField}</td>
                    <td>${listItem.secondField}</td>                    
                </tr>            
            `
        })

        tableBody.innerHTML = tableBodyHTML

        applyStyle()
    }

    function applyStyle() {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)

        // container
        mainContainer.style.maxWidth = `${options.screen.screenWidth}px`
        mainContainer.style.maxHeight = `${options.screen.screenHeight}px`
        mainContainer.style.minWidth = `${options.screen.screenWidth}px`
        mainContainer.style.minHeight = `${options.screen.screenHeight}px`
        mainContainer.style.backgroundColor = options.screen.screenBgcolor

        // table container
        tableContainer.style.width = `${options.list.listWidht}px`
        tableContainer.style.height = `${options.list.listHeight}px`
        tableContainer.style.backgroundColor = options.list.listBgColor
        tableContainer.style.marginTop = `${options.list.marginTop}px`
        tableContainer.style.marginBottom = `${options.list.marginBottom}px`
        tableContainer.style.marginRight = `${options.list.marginRight}px`
        tableContainer.style.marginLeft = `${options.list.marginLeft}px`
        // use main but set table container
        mainContainer.style.justifyContent = options.list.listColumnPosition
        mainContainer.style.alignItems = options.list.listLinePosition

        listItens().forEach(element => {
            element.style.color = options.listItems.itemsDefaultColor
        })

        listIndex().forEach(element => {
            options.listItems.showIndex ? element.style.display = 'block' : element.style.display = 'none'
        })

        tableBody.style.fontSize = `${options.listItems.itemsFontSize}pt`

        higlights().forEach(element => {
            element.style.fontSize = `${options.higlight.higlightFontSize}pt`
            element.style.color = options.higlight.higlightFontColor
            element.style.backgroundColor = options.higlight.higlightBgColor
        })

        // title
        options.listTitle.showTitle ? listTitle.style.display = 'block' : listTitle.style.display = 'none'
        listTitle.style.backgroundColor = options.listTitle.titleBgColor
        listTitle.style.fontSize = `${options.listTitle.titleFontSize}pt`
        listTitle.style.color = options.listTitle.titleFontColor

        // list header
        options.listHeader.showListHeader ? tableHeader.style.visibility = 'visible' : tableHeader.style.visibility = 'collapse'
        tableHeader.style.fontSize = `${options.listHeader.listHeaderFontSize}pt`
        tableHeader.style.color = options.listHeader.listHeaderFontColor
        tableHeader.style.backgroundColor = options.listHeader.listHeaderBgColor
    }

    function saveInStorage(name, data) {
        try {
            localStorage.setItem(name, JSON.stringify(data))

            if (localStorage.getItem(name)) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }
    function getDataFromStorage(name) {
        try {
            if (localStorage.getItem(name)) {
                let data = JSON.parse(localStorage.getItem(name))
                return data
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!getDataFromStorage(`${storagePrefix}list`)) {
        let list = [{ "firstField": "Jon Doe", "secondField": "Have a nice day", "higlight": false }]
        saveInStorage(`${storagePrefix}list`, list)
    }

    if (!getDataFromStorage(`${storagePrefix}overlayOptions`)) {
        saveInStorage(`${storagePrefix}overlayOptions`, overlayOptions)
    }

    tabComunication.onmessage = function (e) {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)

        let type = e.data.type


        if (type == 'deleteItem') {

            if (options.animations.removeItemAnimation) {
                let index = e.data.index
                listItens()[index].classList.add('to-remove')
                setTimeout(() => drawOverlayList(), 1000)
            } else {
                drawOverlayList()
            }

        }

        if (type == 'changePosition') {
            if(options.animations.changePositionAnimation){
                animateChangePosition(e.data)
            }else{
                drawOverlayList()
            }


            
        }
        if (type == 'addedItem') {
            drawOverlayList()

            if (options.animations.addItemAnimation) {
                let index = parseInt(e.data.index) - 1
                let itens = listItens()

                itens[index].classList.add('just-added')

                setTimeout(() => {
                    itens[index].classList.remove('just-added')
                }, 3000);
            }
        }

        if (type == 'updateoverlay') {
            drawOverlayList()
        }

    }

    function animateChangePosition(type) {
        let { action, index } = type
        index = parseInt(index)
        let itens = listItens()

        if (action == 'up') {
            if (typeof (itens[index - 1]) !== 'undefined') {
                //console.log('deu')
                itens[index].classList.add('go-up')
                itens[index - 1].classList.add('go-down')


            }
        }

        if (action == 'down') {
            if (typeof (itens[index + 1]) !== 'undefined') {
                //console.log('deu')
                itens[index].classList.add('go-down')
                itens[index + 1].classList.add('go-up')


            }
        }
        setTimeout(() => {
            drawOverlayList()
            listItens().forEach(item => {
                item.classList.remove('go-down')
                item.classList.remove('go-up')
            })
        }, 600)
    }

    drawOverlayList()
    //localStorage.clear()
}