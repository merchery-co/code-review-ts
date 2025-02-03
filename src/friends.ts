import {IA} from './user'

function getCommonHobbies(f: FriendsOf) {
    return f.friends.reduce((string, friend) => {
        const friendString = `${f.user.user.name} is friend with ${friend.user.name} because they both like: ${friend.user.hobbies.filter(h => f.user.user.hobbies.includes(h)).join(', ')}`
        return string + '; ' + friendString
    }, '')
}

export default class FriendsOf {
    friends: IA[] = []
    user: IA

    constructor(user: IA) {
        this.user = user
    }

    addFriend(friend: IA) {
        this.friends.push(friend)
    }

    hasAnyFriend() {
        return this.friends.length > 0
    }

    toString() {
        return getCommonHobbies(this)
    }
}
