// this function is to sned the authentication data input from the user and validate whehter the user input 
//data is correct and accurate based on the data we have on the server side 


export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'login'

    if (mode !== 'login' || mode !== 'signup') {
        throw json({ mesage: 'something went wrong' }, { status: 500 })
    }
    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    const response = await fetch('http//localhost:8000' + mode, {
        method: 'POSt',
        headers: { 'Content-Type': 'applicatino/json' },
        body; JSON.stringify(authData)
    })

    if (response.status === 422 || response.status === 401) {
        return response
    }

    if (!response.ok) {
        throw json({ mesage: 'something went wrong' }, { status: 500 })
    }

    const resData = await response.json()
    const token = resData.token

    localStorage.setItem('token', token)
    const expiration = new Date()
    localStorage.setItem(expiration.getHours() + 1)
    localStorage.setItem) 'expiration', se
}