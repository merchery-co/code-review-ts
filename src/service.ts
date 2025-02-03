export type Saved<T> = T & { id: string }

function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

export class Service<T extends { id?: string }> {
    elements: Map<string, Saved<T>> = new Map()

    save(data: T | Saved<T>): Saved<T> {
        const id = data.id ?? generateId()
        const stored = { ...data, id }

        this.elements.set(id, stored)

        return stored
    }

    get(user: string): Saved<T> {
        const found = this.elements.get(user)

        if (!found) throw Error('no.')

        return found
    }

    getAll(): Saved<T>[] {
        return Array.from(this.elements.values())
    }
}
