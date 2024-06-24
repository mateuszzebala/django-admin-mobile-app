import React from "react"



export default (initialItems: any[] = []) => {
    const [list, setList]  = React.useState<any[]>(initialItems)
    
    return {
        items: list,
        setItems: setList,
        remove: (item: any) => setList(prev => prev.filter(i => i!=item)),
        pop: (index: number=list.length-1) => setList(prev => prev.filter((_, i) => i!=index)),
        clear: () => setList([]),
        includes: (item: any) => list.includes(item),
        push: (item: any) => setList(prev => [...prev, item]),
        unshift: (item: any) => setList(prev => [item, ...prev])
    }

}





