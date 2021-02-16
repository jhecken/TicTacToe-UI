export interface Game {

    GameID: string;
    BoardSpacesString: string[];
    BoardSpaces: number[];
    PlayerOneID: number;
    PlayerTwoID: number
    WinnerID: number;
}