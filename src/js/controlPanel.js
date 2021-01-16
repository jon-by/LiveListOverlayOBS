window.onload = () => {
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
    const elementColorPicker = document.querySelectorAll('.pickr')
    const menuItems = document.querySelectorAll('.menu-item')

    var bodySections = document.querySelectorAll('section')
    var allInputs = document.querySelectorAll('.check-change')

    // add item page
    var addItemFieldName_1 = document.querySelector('#first-field-name')
    var addItemFieldName_2 = document.querySelector('#second-field-name')
    var btn_addListItem = document.querySelector('#show-options-add-item')

    // list page
    var listHeadFirstField = document.querySelector('#list-head-first-field')
    var listHeadSecondField = document.querySelector('#list-head-second-field')
    var listHeadHiglightField = document.querySelector('#list-head-higlight-field')
    var listTitle = document.querySelector('#list-title')

    // options page        
    // screen
    var screenWidth = () => document.querySelector('#options-change-screen-width')
    var screenHeight = () => document.querySelector('#options-change-screen-height')
    var screenBgColor = () => document.querySelector('#options-change-screen-bg-color')

    // list        
    var listWidht = () => document.querySelector('#options-change-list-width')
    var listHeight = () => document.querySelector('#options-change-list-height')
    var listBgColor = () => document.querySelector('#options-change-list-bg-color')
    var listVerticalPosition = () => document.querySelector('#options-list-vertical-position')
    var listHorizontalPosition = () => document.querySelector('#options-list-horizontal-position')
    var listMarginTop = () => document.querySelector('#options-list-margin-top')
    var listMarginbottom = () => document.querySelector('#options-list-margin-bottom')
    var listMarginRight = () => document.querySelector('#options-list-margin-right')
    var listMarginLeft = () => document.querySelector('#options-list-margin-left')

    // list title 
    var activeTitle = () => document.querySelector('#options-list-title-active')
    var titleText = () => document.querySelector('#options-change-list-title-text')
    var titleFontSize = () => document.querySelector('#options-change-list-title-font-size')
    var titleFontColor = () => document.querySelector('#options-change-list-title-font-color')
    var titleBgColor = () => document.querySelector('#options-change-list-title-bg-color')

    // list header
    var activeListHeader = () => document.querySelector('#options-list-header-active')
    var listHeaderName1 = () => document.querySelector('#options-change-list-header-name1')
    var listHeaderName2 = () => document.querySelector('#options-change-list-header-name2')
    var listHeaderFontSize = () => document.querySelector('#options-change-list-header-font-size')
    var listHeaderFontColor = () => document.querySelector('#options-list-header-font-color')
    var listHeaderBgColor = () => document.querySelector('#options-list-header-bg-color')

    // list items
    var activeListIndex = () => document.querySelector('#options-list-header-show-index')
    var itemDefaultColor = () => document.querySelector('#options-change-list-item-color')
    var itemFontSize = () => document.querySelector('#options-list-item-font-size')

    // higlight
    var higlightFontSize = () => document.querySelector('#options-higlight-font-size')
    var higlightFontColor = () => document.querySelector('#options-higlight-font-color')
    var higlightBgColor = () => document.querySelector('#options-higlight-bg-color')

    //animations
    var animationAddItem = () => document.querySelector('#options-animations-add-item')
    var animationAddItemType = () => document.querySelector('#options-animations-add-item-type')
    var animationRemoveItem = () => document.querySelector('#options-animations-remove-item')
    var animationRemoveItemType = () => document.querySelector('#options-animations-remove-item-type')
    var animationChangePosition = () => document.querySelector('#options-animations-change-position')

    //automation
    var twitchChannel = () => document.querySelector('#automation-twitch-channel')
    var rewardId1 = () => document.querySelector('#automation-add-item-id-1')
    var rewardId2 = () => document.querySelector('#automation-add-item-id-2')
    var rewardId3 = () => document.querySelector('#automation-add-item-id-3')
    var addItemCommand = () => document.querySelector('#automation-add-item-command')
    var removeItemCommand = () => document.querySelector('#automation-remove-item-command')
    var lastRewardId = () => document.querySelector("#last-reward-id")
    var btnSync = document.querySelector('#twitch-channel-connect')

    var restoreBtn = document.querySelector('#restore-btn')

    function updatePanelInterface() {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        //console.log(options)
        // add item page
        addItemFieldName_1.textContent = options.listHeader.listHeaderName1
        addItemFieldName_2.textContent = options.listHeader.listHeaderName2

        screenWidth().value = options.screen.screenWidth
        screenHeight().value = options.screen.screenHeight
        screenBgColor().value = options.screen.screenBgcolor

        listWidht().value = options.list.listWidht
        listHeight().value = options.list.listHeight
        listBgColor().value = options.list.listBgColor
        listVerticalPosition().value = options.list.listColumnPosition
        listHorizontalPosition().value = options.list.listLinePosition
        listMarginTop().value = options.list.marginTop
        listMarginbottom().value = options.list.marginBottom
        listMarginRight().value = options.list.marginRight
        listMarginLeft().value = options.list.marginLeft

        activeTitle().checked = options.listTitle.showTitle
        titleText().value = options.listTitle.titleText
        titleFontSize().value = options.listTitle.titleFontSize
        titleFontColor().value = options.listTitle.titleFontColor
        titleBgColor().value = options.listTitle.titleBgColor

        activeListHeader().checked = options.listHeader.showListHeader
        listHeaderName1().value = options.listHeader.listHeaderName1
        listHeaderName2().value = options.listHeader.listHeaderName2
        listHeaderFontSize().value = options.listHeader.listHeaderFontSize
        listHeaderFontColor().value = options.listHeader.listHeaderFontColor
        listHeaderBgColor().value = options.listHeader.listHeaderBgColor

        activeListIndex().checked = options.listItems.showIndex
        itemDefaultColor().value = options.listItems.itemsDefaultColor
        itemFontSize().value = options.listItems.itemsFontSize

        higlightFontSize().value = options.higlight.higlightFontSize
        higlightFontColor().value = options.higlight.higlightFontColor
        higlightBgColor().value = options.higlight.higlightBgColor

        animationAddItem().checked = options.animations.addItemAnimation
        //animationAddItemType().value = options.animations.addItemAnimationType
        animationRemoveItem().checked = options.animations.removeItemAnimation
        //animationRemoveItemType().value = options.animations.removeItemAnimationType
        animationChangePosition().checked = options.animations.changePositionAnimation

        twitchChannel().value = options.automation.twitchName
        rewardId1().value = options.automation.rewardId1
        rewardId2().value = options.automation.rewardId2
        rewardId3().value = options.automation.rewardId3
        addItemCommand().value = options.automation.addItemCommand
        removeItemCommand().value = options.automation.removeItemCommand

        // list page
        listHeadFirstField.textContent = options.listHeader.listHeaderName1
        listHeadSecondField.textContent = options.listHeader.listHeaderName2

        showListItems()


    }
    function saveChangedOptions() {
        let options = overlayOptions

        options.screen.screenWidth = screenWidth().value
        options.screen.screenHeight = screenHeight().value
        options.screen.screenBgcolor = screenBgColor().value

        options.list.listWidht = listWidht().value
        options.list.listHeight = listHeight().value
        options.list.listBgColor = listBgColor().value
        options.list.listColumnPosition = listVerticalPosition().value
        options.list.listLinePosition = listHorizontalPosition().value
        options.list.marginTop = listMarginTop().value
        options.list.marginBottom = listMarginbottom().value
        options.list.marginRight = listMarginRight().value
        options.list.marginLeft = listMarginLeft().value

        options.listTitle.showTitle = activeTitle().checked
        options.listTitle.titleText = titleText().value
        options.listTitle.titleFontSize = titleFontSize().value
        options.listTitle.titleFontColor = titleFontColor().value
        options.listTitle.titleBgColor = titleBgColor().value

        options.listHeader.showListHeader = activeListHeader().checked
        options.listHeader.listHeaderName1 = listHeaderName1().value
        options.listHeader.listHeaderName2 = listHeaderName2().value
        options.listHeader.listHeaderFontSize = listHeaderFontSize().value
        options.listHeader.listHeaderFontColor = listHeaderFontColor().value
        options.listHeader.listHeaderBgColor = listHeaderBgColor().value

        options.listItems.showIndex = activeListIndex().checked
        options.listItems.itemsDefaultColor = itemDefaultColor().value
        options.listItems.itemsFontSize = itemFontSize().value

        options.higlight.higlightFontSize = higlightFontSize().value
        options.higlight.higlightFontColor = higlightFontColor().value
        options.higlight.higlightBgColor = higlightBgColor().value

        options.animations.addItemAnimation = animationAddItem().checked
        // options.animations.addItemAnimationType = animationAddItemType().value
        options.animations.removeItemAnimation = animationRemoveItem().checked
        //options.animations.removeItemAnimationType = animationRemoveItemType().value
        options.animations.changePositionAnimation = animationChangePosition().checked

        options.automation.twitchName = twitchChannel().value
        options.automation.rewardId1 = rewardId1().value
        options.automation.rewardId2 = rewardId2().value
        options.automation.rewardId3 = rewardId3().value
        options.automation.addItemCommand = addItemCommand().value
        options.automation.removeItemCommand = removeItemCommand().value

        saveInStorage(`${storagePrefix}overlayOptions`, options)
        updatePanelInterface()
        tabComunication.postMessage({
            "type": "updateoverlay"
        })

    }
    function deleteControl() {
        let ItemDeleteControl = document.querySelectorAll('.control-delete')
        ItemDeleteControl.forEach(item => {
            item.onclick = event => {
                let index = event.currentTarget.getAttribute("value")
                removeItemFromList(index)
            }
        })
    }
    function changeItem() {
        let controls = document.querySelectorAll('.list-controls .control')
        controls.forEach(item => {
            item.onclick = event => {
                let index = event.currentTarget.getAttribute("value")
                let action = event.currentTarget.getAttribute("action")

                changeItemPosition(index, action)
            }
        })
    }
    btn_addListItem.onclick = event => {
        event.preventDefault()
        let higlightSub = () => document.querySelector('#higlight-sub')
        let higlightVip = () => document.querySelector('#higlight-vip')
        let higlightBit = () => document.querySelector('#higlight-bit')


        let firstField = document.querySelector('#add-item-field-1').value
        let secondField = document.querySelector('#add-item-field-2').value

        higlightSub().checked ? let = higlightSubs = true : let = higlightSubs = false
        higlightVip().checked ? let = higlightVips = true : let = higlightVips = false
        higlightBit().checked ? let = higlightBits = true : let = higlightBits = false

        if (firstField != '' || secondField != '') {
            addItemToList({
                firstField,
                secondField,
                higlightSubs,
                higlightVips,
                higlightBits
            })
            showSelectedMenu('show-list')
        }
        higlightSub().checked = false
        higlightVip().checked = false
        higlightBit().checked = false
    }


    function showListItems() {
        let list = getDataFromStorage(`${storagePrefix}list`)
        let listBody = document.querySelector('#list-body')
        let tableBodyHTML = ``
        list.forEach((listItem, index) => {
            tableBodyHTML += `
                <tr ${listItem.higlight ? `class="table-warning"` : ''}>
                    <th scope="row">
                        <div class="list-controls">
                            <div class="control" action="up" value="${index}"><i class="fas fa-sort-up"></i></div>
                            <div class="control" action="down" value="${index}"><i class="fas fa-sort-down"></i></div>
                        </div>
                    </th>                     
                    <td>${listItem.firstField}</td>
                    <td>${listItem.secondField}</td>
                    <td class="control-delete" value="${index}"><i class="fas fa-times"></i></td>
                </tr>
            `
        })
        listBody.innerHTML = tableBodyHTML
        deleteControl()
        changeItem()
    }
    function changeItemPosition(index, action) {
        index = parseInt(index)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let original = list[index]
        if (action == 'up') {
            if (typeof (list[index - 1]) !== 'undefined') {
                list[index] = list[index - 1]
                list[index - 1] = original
            }
        }
        if (action == 'down') {
            if (typeof (list[index + 1]) !== 'undefined') {
                list[index] = list[index + 1]
                list[index + 1] = original
            }
        }
        saveInStorage(`${storagePrefix}list`, list)
        updatePanelInterface()
        tabComunication.postMessage({
            "type": "changePosition",
            action,
            index
        })
    }
    function addItemToList(item) {

        //console.log(item)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let index = list.push(item) - 1
        saveInStorage(`${storagePrefix}list`, list)
        showListItems()

        tabComunication.postMessage({
            "type": "addedItem",
            index
        })
    }

    function removeItemFromList(index) {
        let list = getDataFromStorage("LO_list")
        list.splice(index, 1)
        saveInStorage(`${storagePrefix}list`, list)
        showListItems()
        tabComunication.postMessage({
            "type": "deleteItem",
            "index": index
        })
    }
    //menu 
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            higlightSelected(event)
            showSelectedMenu(event.currentTarget.id)
        })
    })
    function higlightSelected(item) {
        menuItems.forEach(element => {
            element.classList.remove("btn-active")
        })
        item.currentTarget.classList.add("btn-active")
    }
    function showSelectedMenu(menu) {
        bodySections.forEach(element => {
            element.classList.add("hide")
            if (element.classList.contains(menu)) {
                element.classList.toggle("hide")
            }
        })
    }
    allInputs.forEach(element => {
        element.onchange = () => {
            saveChangedOptions()
        }
    })
    // color picker
    function loadColorPicker() {
        elementColorPicker.forEach(element => {
            const pickr = new Pickr({
                el: element,
                useAsButton: true,
                default: element.value,
                theme: 'nano',
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,

                    interaction: {
                        hex: false,
                        rgba: true,
                        hsva: false,
                        input: true,
                        save: true
                    }
                }
            }).on('init', pickr => {
                let currentColor = element.value
                element.value = pickr.getSelectedColor().toRGBA().toString(0)
                element.style.backgroundColor = currentColor
            }).on('save', color => {
                let pickedColor = pickr.getSelectedColor().toRGBA().toString(0)
                element.value = pickedColor
                element.style.backgroundColor = pickedColor
                pickr.hide();
            }).on('hide', color => {
                let pickedColor = pickr.getColor().toRGBA().toString(0)
                element.value = pickedColor
                element.style.backgroundColor = pickedColor
                saveChangedOptions()
            })
        })
    }
    // local storage check
    if (!getDataFromStorage(`${storagePrefix}list`)) {
        let list = [{
            "firstField": "Jon Doe",
            "secondField": "Have a nice day",
            "higlightSubs": false,
            "higlightVips": false,
            "higlightBits": false
        }]
        saveInStorage(`${storagePrefix}list`, list)
    }

    if (!getDataFromStorage(`${storagePrefix}overlayOptions`)) {
        saveInStorage(`${storagePrefix}overlayOptions`, overlayOptions)
    }
    //Storage
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

    //automation
    function twitchConnection(channel) {
        fetch(`https://decapi.me/twitch/id/${channel}`)
            .then(response => response.json())
            .then(data => {
                if (data > 0) {
                    ComfyJS.Init(channel);
                }
            })
            .catch( () => {
                btnSync.innerText = 'Connect'
                btnSync.classList.add('btn-danger')
                
            })

        ComfyJS.onConnected = () => {
            saveChangedOptions()
            btnSync.innerText = 'Disconnect'
            btnSync.classList.remove('btn-danger')
            btnSync.classList.add('btn-success', 'connected')

        }
        ComfyJS.onChat = (user, message, flags, self, extra) => {
            handleTwitchChat(user, message, flags, self, extra)
        }

        ComfyJS.onCommand = (user, command, message, flags, extra) => {
            handleTwitchCommand(user, command, message, flags, extra)
        }
    }

    function handleTwitchCommand(user, command, message, flags, extra) {        
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        
        if (command === options.automation.addItemCommand && (flags.broadcaster || flags.mod)) {
            let msg = message.trim().split(' ')
            let secondParam = ''

            msg.forEach((item, index) => {
                if (index > 0) {
                    secondParam += `${item} `
                }
            })

            let toAdd = {
                "firstField": user,
                "secondField": secondParam.trim(),
                "higlightSubs": false,
                "higlightVips": false,
                "higlightBits": false
            }

            addItemToList( toAdd )
        }

        if (command === options.automation.removeItemCommand && (flags.broadcaster || flags.mod)) {
            toRemove = message.trim().replace(/[^\d]+/g, '')
            removeItemFromList(toRemove - 1)
        }
    }

    function handleTwitchChat(user, message, flags, self, extra) {
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        //console.log(flags)
        lastRewardId().value = extra.customRewardId
        let toAdd = {
            "firstField": user,
            "secondField": message,
            "higlightSubs": flags.subscriber,
            "higlightVips": flags.vip,
            "higlightBits": false
        }
        if ( flags.customReward && (
            extra.customRewardId === options.automation.rewardId1 ||
            extra.customRewardId === options.automation.rewardId2 ||
            extra.customRewardId === options.automation.rewardId3
        )) {
            addItemToList(toAdd)
        }
    }

    btnSync.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('connected')) {
            ComfyJS.Disconnect();
            e.target.classList.remove('connected')
            e.target.classList.add('btn-danger')
            e.target.innerText = 'Connect'
        } else {
            twitchConnection(twitchChannel().value)
        }
    })

    restoreBtn.addEventListener('click', event => {
        event.preventDefault()
        localStorage.clear()
        updatePanelInterface()
        tabComunication.postMessage({
            "type": "updateoverlay"
        })
    })

    function twitchAutoConnections(){
        let channel = twitchChannel().value.replaceAll(' ', '')
        if( channel != '' ){
            twitchConnection(channel)
        }
    }

    updatePanelInterface()
    loadColorPicker()
    twitchAutoConnections()
}