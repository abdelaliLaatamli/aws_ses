<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AMAZON ACCOUNTS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" >
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
</head>
<body>

    <div id="root" class="w-100"></div>



    <script type="text/babel" src="./assets/js/accounts.js"></script>
    <script type="text/babel" src="./assets/js/accounts/Navbar.jsx"></script>
    <script type="text/babel" src="./assets/js/accounts/Body.jsx"></script>
    <script type="text/babel" src="./assets/js/accounts/ListAccounts.jsx"></script>
    <script type="text/babel" src="./assets/js/accounts/FormAccounts.jsx"></script>
    
    <script type="text/babel" src="./assets/js/show-waiting.jsx"></script>


    <script type="text/babel">
        ReactDOM.render(<App/> , document.getElementById('root'))
    </script>
</body>
</html>