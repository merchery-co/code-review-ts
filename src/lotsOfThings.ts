import { IA, U } from './user'
import {Saved, Service} from "./service";
import FriendsOf from './friends'

let service = new Service<IA>()

function findFriends(all: IA[] = service.getAll()): { friends: FriendsOf[], neighbors: IA[][] } {
    const friends = [] as FriendsOf[]
    const neighbors = [] as IA[][]

    // find friends
    for (const a of all) {
        let friendsOfA = new FriendsOf(a)

        for (const maybeFriend of all) {
            if (maybeFriend !== a && maybeFriend.canBeFriendsWith(a)) {
                friendsOfA.addFriend(maybeFriend)
            }
        }

        if (friendsOfA.hasAnyFriend()) {
            friends.push(friendsOfA)
        }
    }

    // find neighbours
    for (const a of all) {
        let neighborsOfA: IA[] = []

        for (const maybeNeighbor of all) {
            if (maybeNeighbor !== a && maybeNeighbor.user.address === a.user.address) {
                neighborsOfA.push(maybeNeighbor)
            }
        }

        if (neighborsOfA.length > 0) {
            neighbors.push(neighborsOfA)
        }
    }

    return { friends, neighbors }
}

export default () => {
    console.debug('Creating people')
    let u1 = new U('John', 60, 'Belgium', 'john@merchery.be', 'bridge')
    const u2 = new U('Phil', 15, 'Belgium', 'phil@merchery.be', 'hockey', 'music', 'TikTok')
    const u3 = new U('Emma', 40, 'Netherlands', 'emma@merchery.be', 'hockey', 'reading')
    const u4 = new U('Lucy', 23, 'Luxembourg', 'lucy@merchery.be', 'reading', 'hockey', 'TikTok')

    console.debug('Saving people in service')
    u1 = service.save(u1) as Saved<U> // have to cast otherwise compiler complains. Safe because we just saved it.
    console.log('User 1 has been saved with id:', (u1 as Saved<U>).id) // have to cast AGAIN otherwise compiler complains. Safe because we just saved it above.
    service.save(u2)
    service.save(u3)
    service.save(u4)

    const { friends, neighbors } = findFriends()

    console.log('Friends now', ...friends.map(f => f.toString()))
    console.log('Neighbors', ...neighbors.flatMap(f => f.map(ff => ff.to_String())))

    // Now we wait, to see if friendships and neighbors remain after many years
    service.getAll().forEach(u => {
        u.user.age += 15

        if (u.user.age >= 35) {
            u.user.hobbies = u.user.hobbies.filter(hobby => hobby !== 'TikTok') // At some point in life we don't like TikTok anymore
        }

        if (u.user.age >= 55) {
            u.user.hobbies = u.user.hobbies.filter(hobby => hobby !== 'bridge') // remove it first so we don't have it twice
            u.user.hobbies.push('bridge') // At some point in life we start to like playing bridge
        }
    })
    console.debug('Check if age has been updated in service', u3.user.age, service.get(u3.user.email).user.age)

    const u5 = new U('Ana', 12, 'Belgium', 'ana@merchery.be', 'TikTok', 'football')
    const u6 = new U('Toby', 14, 'Luxembourg', 'toby@merchery.be', 'TikTok', 'music')
    const results = findFriends([
        ...service.getAll(),
        u5,
        u6,
    ])
    const newFriends = results.friends

    console.log('Friends later', ...newFriends.map(f => `${(f.user as Saved<U>).id}: ${f.toString()}`))
    console.log('Neighbors later', ...results.neighbors.flatMap(f => f.map(ff => ff.to_String())))

    return newFriends
}
