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
    axios.get('/api/admin/transactions')
        .then(function(response) {
            adminAppViewModel.transactions = response.data.result
        })
        .catch(function(err) {
            alert(JSON.stringify(err))
        })
}

ko.applyBindings(adminAppViewModel)

getTransactions()
setInterval(getTransactions, 2000)
