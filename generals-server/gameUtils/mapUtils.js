import {random, sample, min} from 'lodash'

export const generateMap = ({
    width, 
    height,
    castles,
    mountains,
    archeryTowers,
    observerTowers,
    abondedFotresses,
    players
}) => {
    const QUARTERS = [
        {
            xFrom: 0, 
            xTo: Math.floor(width / 2), 
            yFrom: 0, 
            yTo: Math.floor(height / 2)
        },
        {
            xFrom: Math.floor(width / 2), 
            xTo: width - 1, 
            yFrom: 0, 
            yTo: Math.floor(height / 2)
        },
        {
            xFrom: 0, 
            xTo: Math.floor(width / 2), 
            yFrom: Math.floor(height / 2), 
            yTo: height - 1
        },
        {
            xFrom: Math.floor(width / 2), 
            xTo: width - 1, 
            yFrom: Math.floor(height / 2), 
            yTo: height - 1
        },
    ] 

    let result = []
    const generateCoordinates = (iteration) => {
        const quarter = QUARTERS[iteration % QUARTERS.length]
        return [
            random(quarter.xFrom, quarter.xTo),
            random(quarter.yFrom, quarter.yTo)
        ]
    }

    const quarterStructures = [
        {index: 0, structures: 0},
        {index: 1, structures: 0},
        {index: 2, structures: 0},
        {index: 3, structures: 0},
    ]

    const getQuarterIndexForBuilding = () => {
        const minStructures = min(quarterStructures.map(v => v.structures))
        const quarter = sample(quarterStructures.filter(v => v.structures === minStructures))
        ++quarter.structures
        return quarter.index
    }
    const generateCoordinatesForStructure = () => {
        const quarter = getQuarterIndexForBuilding()
        let [x, y] = generateCoordinates(quarter)
        while (result[x][y].type != 'plain') {
            [x, y] = generateCoordinates(quarter)
        }
        return [x, y]
    }
    
    // generate map
    for(let y = 0; y < width; y++) {
        result[y] = []
        for(let x = 0; x < height; x++) {
            result[y][x] = ({
                type: 'plain',
                owner: 'n',
                units: null,
                x,
                y
            })
        }
    }

    // generate structures
    for (let i = 0; i < archeryTowers; i++) {
        const [x, y] = generateCoordinatesForStructure()
        result[x][y] = ({
            ...result[x][y],
            type: 'archeryTower',
            units: random(0,25) + 80
        })
    }

    for (let i = 0; i < observerTowers; i++) {
        const [x, y] = generateCoordinatesForStructure()
        result[x][y] = ({
            ...result[x][y],
            type: 'observerTower',
            units: random(0,25) + 80
        })
    }

    for (let i = 0; i < abondedFotresses; i++) {
        const [x, y] = generateCoordinatesForStructure()
        result[x][y] = ({
            ...result[x][y],
            type: 'abandonedFortress',
            units: 250
        })
    }

    for (let i = 0; i < castles; i++) {
        const [x, y] = generateCoordinatesForStructure()
        result[x][y] = ({
            ...result[x][y],
            type: 'castle',
            units: random(5,18) + 30
        })
    }

    for (let i = 0; i < mountains; i++) {
        const [x, y] = generateCoordinates(i)
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'mountain'
        })
    }

    let i = 0
    const capitolsCoordinates = []
    const quartersCapitols = [
        {quarter: 0, occupancy: 0},
        {quarter: 1, occupancy: 0},
        {quarter: 2, occupancy: 0},
        {quarter: 3, occupancy: 0},
    ]

    const MIN_CAPITOL_DISTANCE = (Math.sqrt(width*height/players.length) / 2) + 1 

    while(true) {
        const maxInQuarters = quartersCapitols
                                .map(v => v.occupancy)
                                .reduce((acc, v) => acc > v ? acc : v, 0)

        let pickFrom = quartersCapitols.filter(v => v.occupancy < maxInQuarters)
        if(pickFrom.length == 0) pickFrom = quartersCapitols
        let selectedQuarter = sample(pickFrom)
        selectedQuarter.occupancy++

        let [x, y] = generateCoordinates(selectedQuarter.quarter)
        if (
            capitolsCoordinates.find(([posX, posY]) => (Math.pow(x - posX, 2) + Math.pow(y - posY, 2)) <= Math.pow(MIN_CAPITOL_DISTANCE, 2))
        ) {
            continue
        }
        
        result[x][y] = ({
            ...result[x][y],
            type: 'capitol',
            owner: players[i],
            units: 1
        })

        capitolsCoordinates.push([x, y])
        if (++i === players.length) break
    }

    // 
    const checkBoardIsValid = ([initX, initY]) => {
        const visitedTiles = [result[initX][initY]]
        let foundCapitols = 1

        for (let field of visitedTiles) {
            const {x, y} = field
            let proposalTiles = [
                result[y+1] && result[y+1][x],
                result[y-1] && result[y-1][x],
                result[y][x+1],
                result[y][x-1],
            ]

            let spreadToFields = proposalTiles.filter(v => v && v.type != 'mountain' && !visitedTiles.includes(v))
            spreadToFields.forEach(v => {
                visitedTiles.push(v)
                if (v.type === 'capitol') foundCapitols++
            })
            if(foundCapitols === players.length) return true
        }
        return false
    }

    return checkBoardIsValid(capitolsCoordinates[0])
        ? result
        : generateMap({
            width, 
            height,
            castles,
            mountains,
            players
        })
}