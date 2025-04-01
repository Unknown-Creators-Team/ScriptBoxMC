import { Entity, ScoreboardIdentity, ScoreboardObjective, world } from "@minecraft/server";

export namespace ScoreboardUtils {
    export function addObjective(id: string, display?: string): ScoreboardObjective {
        return world.scoreboard.addObjective(id, display);
    }

    export function getObjective(id: string): ScoreboardObjective {
        const object = world.scoreboard.getObjective(id);
        if (!object) return addObjective(id);
        return object;
    }

    export function deleteObjective(id: string): boolean {
        return world.scoreboard.removeObjective(id);
    }

    export function getScore(target: ScoreboardIdentity | Entity | string, objective: string): number | undefined {
        try {
            return getObjective(objective).getScore(target);
        } catch {
            return undefined;
        }
    }

    export function addScore(target: ScoreboardIdentity | Entity | string, objective: string, value: number): number {
        return getObjective(objective).addScore(target, value);
    }

    export function setScore(target: ScoreboardIdentity | Entity | string, objective: string, value: number): void {
        return getObjective(objective).setScore(target, value);
    }

    export function resetScore(target: ScoreboardIdentity | Entity | string, objective: string): boolean {
        return getObjective(objective).removeParticipant(target);
    }
}