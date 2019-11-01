var appViewModel = {
    isAppInited: ko.observable(false),
    user: ko.observable(null),
    currentBalance: ko.observable(0),
    loginPopup: {
        isShown: ko.observable(false),
        errorMessage: ko.observable(null)
    },
    changeNamePopup: {
        isShown: ko.observable(false)
    },

    lootboxes: [
        {level: 1, cost: Math.abs(window.CONSTANTS.LOOTBOX_LEVEL_ONE_COST), mod: 'level-one'},
        {level: 2, cost: Math.abs(window.CONSTANTS.LOOTBOX_LEVEL_TWO_COST), mod: 'level-two'},
        {level: 3, cost: Math.abs(window.CONSTANTS.LOOTBOX_LEVEL_THREE_COST), mod: 'level-three'}
    ],

    currentProcessLootbox: ko.observable(null)
};
ko.track(appViewModel, {deep: true})

function requestLogin() {
    axios.get('/api/private/user')
        .then(function(response) {
            appViewModel.user = response.data.result
            if (!appViewModel.user.displayName) {
                showChangeNamePopup()
            }
            getBalanceRepeatedly()
        })
        .catch(function(err) {
            if (err.response.status === 401) {
                showLoginPopup()
            }
        })
}

function getBalance() {
    return axios.get('/api/private/balance')
        .then(function(response) {
            appViewModel.currentBalance = response.data.result.balance
        })
        .catch(function(err) {
            if (err.response.status === 401) {
                showLoginPopup()
            }
        })
}

function getBalanceRepeatedly() {
    getBalance()
    setInterval(function() {
        getBalance()
    }, 5 * 1000)
}

function purchaseLootbox(level) {
    return axios.post('/api/private/purchase-lootbox', {tier: level})
        .then(function(response) {
            getBalance()
        })
        .catch(function(err) {
            if (err.response.status === 401) {
                showLoginPopup()
            }
        })
}

function showLoginPopup() {
    appViewModel.loginPopup.isShown = true
}

function showChangeNamePopup() {
    appViewModel.changeNamePopup.isShown = true
}

function handleLoginPopupSubmit(props) {
    if (!props.value) {
        return
    }
    axios.post('/api/login', {secretKey: props.value})
        .then(function(response) {
            appViewModel.user = response.data.result
            appViewModel.loginPopup.isShown = false
            if (!appViewModel.user.displayName) {
                showChangeNamePopup()
            }
        })
        .catch(function(err) {
            if (err.response.status === 403) {
                appViewModel.loginPopup.errorMessage = 'Чёто не то ввели, попрообуйте снова'
                return
            }
            appViewModel.loginPopup.errorMessage = err.response.data.result
        })
}

function handleNamePopupSubmit(props) {
    if (!props.value) {
        return
    }
    axios.patch('/api/private/user', {displayName: props.value})
        .then(function(response) {
            appViewModel.user = response.data.result
            appViewModel.changeNamePopup.isShown = false
        })
        .catch(function(err) {
            if (err.response.status === 403) {
                appViewModel.loginPopup.errorMessage = 'Чёто не то ввели, попрообуйте снова'
                return
            }
            appViewModel.loginPopup.errorMessage = err.response.data.result
        })
}

function getLootboxClickHandler(lootbox) {
    return function() {
        if (appViewModel.currentProcessLootbox) {
            return
        }
        appViewModel.currentProcessLootbox = {
            level: lootbox.level,
            state: 'shake'
        }
        setTimeout(function() {
            purchaseLootbox(lootbox.level).then(function() {
                appViewModel.currentProcessLootbox = {
                    level: lootbox.level,
                    state: 'finished'
                }
                setTimeout(function() {
                    appViewModel.currentProcessLootbox = null
                }, 3000)
            }).catch(function(err) {
                appViewModel.currentProcessLootbox = null
            })
        }, 1500)
    }
}

function isLootboxInShakeState(level) {
    return appViewModel.currentProcessLootbox
        && appViewModel.currentProcessLootbox.level === level
        && appViewModel.currentProcessLootbox.state === 'shake'
}

function isLootboxInFinishedState(level) {
    return appViewModel.currentProcessLootbox
        && appViewModel.currentProcessLootbox.level === level
        && appViewModel.currentProcessLootbox.state === 'finished'
}

function isLootboxAvailableForPurchase(cost) {
    console.log(appViewModel.currentBalance >= cost, appViewModel.currentBalance, cost)
    return appViewModel.currentBalance >= cost
}

ko.applyBindings(appViewModel);
requestLogin()
appViewModel.isAppInited = true

var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
