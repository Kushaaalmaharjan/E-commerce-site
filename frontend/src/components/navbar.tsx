import logo from '../assets/logo.jpg'

function navbar(){
    return(
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>

        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
            <img src={logo} width="60" height="60" alt=""></img>
            </a>
        </nav>
        </>
    )
}

export default navbar;