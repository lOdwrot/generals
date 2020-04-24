import { io } from "..";

export const notifyPeaceEnd = (roomId) => io.to(roomId).emit('endOfPeace')
export const notifyRemovedCommands = (socketId, commands) => commands.length && io.to(socketId).emit('removeCommands', commands)
export const notifyNextBoard = (roomId, board) => io.to(roomId).emit('updateBoard', board)
export const notifyNextStats = (roomId, stats) => io.to(roomId).emit('updateStats', stats)
export const notifyLost = (socketId) => io.to(socketId).emit('loser')
export const notifyGameEnd = (roomId) => io.to(roomId).emit('winner')
export const notifyCooldownTic = (roomId) => io.to(roomId).emit('cooldownTic')
export const notifySound_autumn = (roomId) => io.to(roomId).emit('sound_autumn')

export const notifySound_conquerCastle = (socketId) => io.to(socketId).emit('sound_ConquerCastle')
export const notifySound_conquerCapitol = (socketId) => io.to(socketId).emit('sound_ConquerCapitol')
export const notifySound_lostCapitol = (socketId) => io.to(socketId).emit('sound_LostCapitol')
export const notifySound_archeryShooted = (socketId) => io.to(socketId).emit('sound_archeryShooted')