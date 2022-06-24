function criar_sequencia () {
    direcao = [
    "N",
    "S",
    "L",
    "O"
    ]
    temporaria = []
    sequencia = []
    for (let índice = 0; índice <= direcao.length - 1; índice++) {
        temporaria.push(direcao[índice])
    }
    for (let index = 0; index < 4; index++) {
        posicao = randint(0, temporaria.length - 1)
        sequencia.unshift(temporaria[posicao])
        temporaria.removeAt(posicao)
    }
}
function ativar_leds (seta: string) {
    brilho = 9
    while (brilho > -1) {
        if (seta == "N") {
            led.plotBrightness(2, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 2, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(440, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "L") {
            led.plotBrightness(4, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(3, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(4, 4, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(659, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "S") {
            led.plotBrightness(0, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 3, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 4, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 4, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(554, music.beat(BeatFraction.Whole))
            }
        }
        if (seta == "O") {
            led.plotBrightness(0, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(0, 2, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 0, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(1, 1, Math.map(brilho, 0, 9, 0, 255))
            led.plotBrightness(2, 0, Math.map(brilho, 0, 9, 0, 255))
            if (brilho == 9) {
                music.playTone(330, music.beat(BeatFraction.Whole))
            }
        }
        brilho += -1
        basic.pause(30)
    }
}
let opcao_jogador = ""
let brilho = 0
let posicao = 0
let sequencia: string[] = []
let temporaria: string[] = []
let direcao: string[] = []
game.setScore(0)
basic.forever(function () {
    while (!(game.isGameOver())) {
        basic.clearScreen()
        criar_sequencia()
        basic.showLeds(`
            # # # # #
            # . . . .
            # # # # #
            . . . . #
            # # # # #
            `)
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= 3; índice++) {
            ativar_leds(sequencia[índice])
        }
        basic.showString("#")
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= 3; índice++) {
            opcao_jogador = "#"
            while (opcao_jogador == "#") {
                if (input.acceleration(Dimension.Y) < 40 && input.acceleration(Dimension.X) > 40) {
                    opcao_jogador = "N"
                }
                if (input.acceleration(Dimension.Y) > 40 && input.acceleration(Dimension.X) > 40) {
                    opcao_jogador = "L"
                }
                if (input.acceleration(Dimension.Y) > 40 && input.acceleration(Dimension.X) < 40) {
                    opcao_jogador = "S"
                }
                if (input.acceleration(Dimension.Y) < 40 && input.acceleration(Dimension.X) < 40) {
                    opcao_jogador = "O"
                }
                ativar_leds(opcao_jogador)
            }
            if (opcao_jogador != sequencia[índice]) {
                game.gameOver()
            }
        }
        game.addScore(1)
    }
})
