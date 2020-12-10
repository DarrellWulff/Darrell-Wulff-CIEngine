class Game
{
    //CIEngine will run a game instance which will have the custom logic for the game
    static entityList = [];

    constructor()
    {
        console.log("Loading Game");
        this.scene;
    }

    initGame()
    {
        let i = 0;
        let listLength =  Game.entityList.length;

        while(i < listLength)
        {
            Game.entityList[i].start();
            i++;
        }
    }

    updateGame(delta)
    {
        let i = 0;
        let listLength =  Game.entityList.length;

        while(i < listLength && delta != null)
        {
            if( Game.entityList[i].entityUpdate)
            {
                Game.entityList[i].update(delta);
            }
            
            i++;
        }
    }

    static addEntityToGame(entity)
    {
        Game.entityList.push(entity);
    }

    static deleteEntity(entity)
    {
        let oldIndex = Game.entityList.indexOf(entity);

        if(oldIndex > -1)
        {
            Game.entityList.splice(oldIndex);
        }
        else
        {
            console.log("Entity not in game entity list!");
        }
    }

    static getEntity(entity)
    {
        return Game.entityList.find(element => element == entity);
    }
}