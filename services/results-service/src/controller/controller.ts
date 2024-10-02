import { ResultPerTeamSchema } from '../common/types/resultsPerTeam.type'
import { getResultsOfTeam } from '../data/getResults'

export async function main(teamId: number): Promise<ResultPerTeamSchema> {
    const results = await getResultsOfTeam(teamId)
    return results
}
