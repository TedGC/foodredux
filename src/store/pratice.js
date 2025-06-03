
export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'login'

    if (mode !== 'login' || mode !== 'singup') {
        throw json({ message: 'something went wrong' }, { status: 422 })
    }

    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    const response = await fetch('http://localhost:8000/' + mode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
    })

    if (response.status === 422 || response.status === 404) {
        return response
    }

    if (!response.ok) {
        throw json({ message: 'soemthign went wrong dude' }, { status: 500 })
    }

    const resData = await response.json()
    const token = resData.token

    localStorage.setItem('token', token)
    const expiration = new Date()
    localStorage.setHours(expiration.getHours() + 1)
    localStorage.setItem('expiration', expiration.toString())
}





