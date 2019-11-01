const adminAppViewModel = {
    transactions: ko.isObservableArray([])
}
ko.track(adminAppViewModel, {deep: true})

function handleStartIncomeButtonClick() {
    axios.post('/api/admin/start-income')
        .then(function(response) {
            alert('INCOME_STARTED')
        })
        .catch(function(err) {
            alert(JSON.stringify(err))
        })
}


function handleStopIncomeButtonClick() {
    axios.post('/api/admin/stop-income')
        .then(function(response) {
            alert('INCOME_STOPPED')
        })
        .catch(function(err) {
            alert(JSON.stringify(err))
        })
}

function getTransactions() {
    axios.get('/api/admin/lootboxes')
        .then(function(response) {
            adminAppViewModel.transactions = response.data.result
        })
        .catch(function(err) {
            alert(JSON.stringify(err))
        })
}

function markPurchaseReceived(eventId) {
    axios.patch('/api/admin/lootboxes', {id: eventId})
        .then(function(response) {
            getTransactions()
        })
        .catch(function(err) {
            alert(JSON.stringify(err))
        })
}

ko.applyBindings(adminAppViewModel)

getTransactions()
setInterval(getTransactions, 2000)
