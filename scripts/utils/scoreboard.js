import { world } from "@minecraft/server";
export var ScoreboardUtils;
(function (ScoreboardUtils) {
    function addObjective(id, display) {
        return world.scoreboard.addObjective(id, display);
    }
    ScoreboardUtils.addObjective = addObjective;
    function getObjective(id) {
        const object = world.scoreboard.getObjective(id);
        if (!object)
            return addObjective(id);
        return object;
    }
    ScoreboardUtils.getObjective = getObjective;
    function deleteObjective(id) {
        return world.scoreboard.removeObjective(id);
    }
    ScoreboardUtils.deleteObjective = deleteObjective;
    function getScore(target, objective) {
        try {
            return getObjective(objective).getScore(target);
        }
        catch {
            return undefined;
        }
    }
    ScoreboardUtils.getScore = getScore;
    function addScore(target, objective, value) {
        return getObjective(objective).addScore(target, value);
    }
    ScoreboardUtils.addScore = addScore;
    function setScore(target, objective, value) {
        return getObjective(objective).setScore(target, value);
    }
    ScoreboardUtils.setScore = setScore;
    function resetScore(target, objective) {
        return getObjective(objective).removeParticipant(target);
    }
    ScoreboardUtils.resetScore = resetScore;
})(ScoreboardUtils || (ScoreboardUtils = {}));
//# sourceMappingURL=scoreboard.js.map