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
        },
        "automation": {
            "twitchName": '',
            "rewardId1": '',
            "rewardId2": '',
            "rewardId3": '',
            "addItemCommand": 'listadd',
            "removeItemCommand": 'listremove'
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
    var highlights = () => document.querySelectorAll('.higlight')
    var listItems = () => document.querySelectorAll('.list-item')

    function drawOverlayList() {


        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let tableBodyHTML = ``
        //console.log(list)
        listTitle.textContent = options.listTitle.titleText
        listFirstField.textContent = options.listHeader.listHeaderName1
        listSecondField.textContent = options.listHeader.listHeaderName2

        list.forEach((listItem, index) => {
           // console.log(listItem.higlightSubs)
            let subBitVip = ''
            if (listItem.higlightSubs) {
                subBitVip = 'sub'
            } else if (listItem.higlightBits) {
                subBitVip = 'bits'
            } else if (listItem.higlightVips) {
                subBitVip = 'vip'
            }

            //console.log(subBitVip)

            tableBodyHTML += `
                <tr class="list-item${index === 0 ? ' fist-item ' : ''} ${subBitVip != '' ? subBitVip + ' higlight' : ''} ">
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

        listItems().forEach(element => {
            element.style.color = options.listItems.itemsDefaultColor
        })

        listIndex().forEach(element => {
            options.listItems.showIndex ? element.style.display = 'block' : element.style.display = 'none'
        })

        tableBody.style.fontSize = `${options.listItems.itemsFontSize}pt`

        highlights().forEach(element => {
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
    
    tabComunication.onmessage = function (e) {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        let type = e.data.type

        if (type == 'deleteItem') {

            if (options.animations.removeItemAnimation) {
                let index = e.data.index
                listItems()[index].classList.add('to-remove')
                setTimeout(() => drawOverlayList(), 1000)
            } else {
                setTimeout(() => drawOverlayList(), 50)
            }
        }

        if (type == 'changePosition') {
            if (options.animations.changePositionAnimation) {
                animateChangePosition(e.data)
            } else {
                setTimeout(() => drawOverlayList(), 300)
            }
        }
        if (type == 'addedItem') {
            setTimeout(() => {

                drawOverlayList()

                let list = getDataFromStorage(`${storagePrefix}list`)

               // console.log(list)

                let index = e.data.index
                if (options.animations.addItemAnimation) {

                    let items = listItems()

                    items[index].classList.add('just-added')

                    setTimeout(() => {
                        items[index].classList.remove('just-added')
                    }, 3000);
                }
            }, 50)
        }
        if (type == 'updateoverlay') {
            setTimeout(() => drawOverlayList(), 50)
        }
    }

    function animateChangePosition(type) {
        let { action, index } = type
        index = parseInt(index)
        let itens = listItems()

        if (action == 'up') {
            if (typeof (itens[index - 1]) !== 'undefined') {                
                itens[index].classList.add('go-up')
                itens[index - 1].classList.add('go-down')
            }
        }
        if (action == 'down') {
            if (typeof (itens[index + 1]) !== 'undefined') {                
                itens[index].classList.add('go-down')
                itens[index + 1].classList.add('go-up')
            }
        }
        setTimeout(() => {
            drawOverlayList()
            listItems().forEach(item => {
                item.classList.remove('go-down')
                item.classList.remove('go-up')
            })
        }, 600)
    }


    function saveInStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data))
            return JSON.parse(localStorage.getItem(key)) 
        } catch (error) {
            console.log(error)
            return false
        }
    }
    function getDataFromStorage(key) {
        try {            
            return JSON.parse(localStorage.getItem(key))           
        } catch (error) {
            //console.error(JSON.parse(error))
            return false
        }
    }
    (()=>{
        let musicListSample = [{
            "firstField": "github.com/jon-by",
            "secondField": "Check for updates",
            "higlightSubs": false,
            "higlightVips": false,
            "higlightBits": false,
            id:null
        }]
        //console.log(musicListSample)
        if (!getDataFromStorage(`${storagePrefix}list`)) {
           let teste = saveInStorage(`${storagePrefix}list`, musicListSample)
           // console.log(teste)
        }

        if (!getDataFromStorage(`${storagePrefix}overlayOptions`)) {
            saveInStorage(`${storagePrefix}overlayOptions`, overlayOptions)
        }

    })();
    drawOverlayList()
    //localStorage.clear()
}