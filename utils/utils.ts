import StringLib from 'string'

export const range = (arg1: number | null = null, arg2: number | null = null, arg3: number | null = null): number[] => {
    const list: number[] = []

    if (arg1 != null && arg2 != null && arg3 != null){
        for(let i = arg1; i < arg2; i+=arg3) list.push(i)
    }
    else if (arg1 != null && arg2 != null){
        for(let i = arg1; i < arg2; i+=1) list.push(i)
    }
    else if (arg1 != null){
        for(let i = 0; i < arg1; i+=1) list.push(i)
    }

    return list
}

export const randInt = (min: number = 0, max: number = 100): number => {
    return Math.round(Math.random() * max + min)
}

export const randChoice = (items: any[]): any => {
    const max = items.length
    if (max == 0) throw new Error("Length of array should be more than 0!")
    const index = randInt(0, max)
    return items[index]
}

export const generateRandomId = (length: number = 20): string => {
    const chars = "ABCDEFGHIJKLMNPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890"
    let str: string = ""
    range(0, length).forEach(() => {    
        str += randChoice([...chars])
    })
    return str
}


export const dateFunctions = {
    getTimeString: (date: Date) => {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    },
    getDateString: (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear().toString().padStart(4, '0')}`
    }
    
}