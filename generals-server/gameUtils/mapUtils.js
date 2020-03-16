export const generateMap = ({
    width = 16, 
    height = 16,
    castles = 12,
    mountains = 28,
    players = ['p1', 'p2']
}) => {
    let result = []
    // generate map
    const generateCoordinates = () => ([
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height)
    ])
    
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
        const [x, y] = generateCoordinates()
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'castle',
            units: Math.floor(Math.random() * 15) + 30
        })
    }

    for (let i = 0; i < mountains; i++) {
        const [x, y] = generateCoordinates()
        if(result[x][y].type != 'plain') continue
        result[x][y] = ({
            ...result[x][y],
            type: 'mountain'
        })
    }

    let i = 0
    while(true) {
        let [x, y] = generateCoordinates()
        if(i == 0) {
            x = 5
            y = 5
        }
        
        result[x][y] = ({
            ...result[x][y],
            type: 'capitol',
            owner: players[i],
            units: 99
        })
        
        if (++i === players.length) break
    } 

    return result
}