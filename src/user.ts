type Hobby = 'reading' | 'music' | 'painting' | 'football' | 'hockey' | 'TikTok' | 'bridge'
type Hobbies = Hobby[]

type A = {
    name: string
    age: number
    address: string
    email: string
    hobbies: Hobbies
}

interface IA {
    id?: string
    readonly user: A

    SayHello(): string
    interests(): any
    to_String(): string
    canBeFriendsWith(user: IA): boolean
}

/**
 * A class representing a user
 * Provides some helper functions to find friends of a given user, based on shared hobbies
 */
class U implements IA {
    id?: string
    readonly user: A

    constructor(prop1: string, prop2: number, prop3: string, prop4: string, ...otherProps: Hobbies) {
        this.user = { name: prop1, age: prop2, address: prop3, email: prop4, hobbies: otherProps }
    }

    SayHello(): string {
        return `Hello, ${this.user.name}!`
    }

    interests() {
        console.log('I am interested in', this.user.hobbies.join(', '))
    }

    to_String(): string {
        return '[User] ' + this.user.name + ' / ' + this.user.address + ' / ' + this.user.email
    }

    private likes(hobby: Hobby) {
        let doesLike = false

        this.user.hobbies.forEach(h => {
            if (h === hobby) {
                doesLike = true
            }
        })

        return doesLike
    }

    canBeFriendsWith(user: IA): boolean {
        for (var i = 0; i < user.user.hobbies.length; i++) {
            let likes = this.likes(user.user.hobbies[i])

            if (likes) return likes
        }
        return false
    }
}

export { A, IA, U }
