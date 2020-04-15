import { io } from "..";

export const notifyPeaceEnd = (roomId) => io.to(roomId).emit('endOfPeace')
export const notifyRemovedCommands = (socketId, commands) => commands.length && io.to(socketId).emit('removeCommands', commands)
export const notifyNextBoard = (roomId, board) => io.to(roomId).emit('updateBoard', board)
export const notifyNextStats = (roomId, stats) => io.to(roomId).emit('updateStats', stats)
export const notifyLost = (socketId) => io.to(socketId).emit('loser')
export const notifyGameEnd = (roomId) => io.to(roomId).emit('winner')
export const notifyCooldownTic = (roomId) => io.to(roomId).emit('cooldownTic')
