import { Entity, ScoreboardIdentity, ScoreboardObjective } from "@minecraft/server";
export declare namespace ScoreboardUtils {
    function addObjective(id: string, display?: string): ScoreboardObjective;
    function getObjective(id: string): ScoreboardObjective;
    function deleteObjective(id: string): boolean;
    function getScore(target: ScoreboardIdentity | Entity | string, objective: string): number | undefined;
    function addScore(target: ScoreboardIdentity | Entity | string, objective: string, value: number): number;
    function setScore(target: ScoreboardIdentity | Entity | string, objective: string, value: number): void;
    function resetScore(target: ScoreboardIdentity | Entity | string, objective: string): boolean;
}
