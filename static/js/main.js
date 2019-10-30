var appViewModel = {
    isAppInited: ko.observable(false),
    user: ko.observable(null),
    currentAmount: ko.observable(105),
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

ko.applyBindings(appViewModel);
requestLogin()
appViewModel.isAppInited = true
