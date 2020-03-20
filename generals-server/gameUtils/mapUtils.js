import {random} from 'lodash'

export const generateMap = ({
    width = 16, 
    height = 16,
    castles = 12,
    mountains = 28,
    players = ['p1', 'p2']
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

    // generate castles
    for (let i = 0; i < castles; i++) {
        const [x, y] = generateCoordinates(i)
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'castle',
            units: Math.floor(Math.random() * 15) + 30
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
    const MIN_CAPITOL_DISTANCE = (width + height) / (3 * players.length) 
    while(true) {
        let [x, y] = generateCoordinates(random(0, 3))
        if (
            capitolsCoordinates.find(([posX, posY]) => (Math.abs(x - posX) + Math.abs(y - posY)) < MIN_CAPITOL_DISTANCE)
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
                result[x+1] && result[x+1][y],
                result[x-1] && result[x-1][y],
                result[x][y+1],
                result[x][y-1],
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