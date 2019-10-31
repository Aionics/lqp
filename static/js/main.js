var appViewModel = {
    isAppInited: ko.observable(false),
    user: ko.observable(null),
    currentBalance: ko.observable(0),
    lootboxState: ko.observable('initial'), // initial, shake, finished
    loginPopup: {
        isShown: ko.observable(false),
        errorMessage: ko.observable(null)
    },
    changeNamePopup: {
        isShown: ko.observable(false)
    }
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

function purchaseLootbox() {
    return axios.post('/api/private/purchase-lootbox')
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

function handleLootboxClick() {
    if (appViewModel.lootboxState !== 'initial') {
        return
    }
    appViewModel.lootboxState = 'shake'
    setTimeout(function() {
        purchaseLootbox().then(function() {
            appViewModel.lootboxState = 'finished'

            setTimeout(function() {
                appViewModel.lootboxState = 'initial'
            }, 5000)
        }).catch(function(err) {
            appViewModel.lootboxState = 'initial'
        })
    }, 1500)
}

ko.applyBindings(appViewModel);
requestLogin()
appViewModel.isAppInited = true

$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
})

