import playersModels from "../models/players.models";
import teamModels from "../models/team.models";

async function refreshChatRatings() {
  const players = await playersModels.find();
  const playersWithRatings: any = players.map((player) => {
    const playersRatings = player.chatRatings.map((rate) => rate.rating);
    const averageRating =
      playersRatings.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / playersRatings.length;
    return {
      ...player,
      chatRatingAverage: averageRating,
    };
  });

  await playersModels.updateMany({}, playersWithRatings);
}

async function refreshTeamsRatings() {
  const players = await playersModels.find();
  const teams = await teamModels.find();

  teams.forEach(async (team) => {
    const playersToSameTeam = players.filter(player => player.team === team.name)

    const playersRatings = playersToSameTeam.map(player => player.rating)

    const averageRating = playersRatings.reduce((accumulator, currentValue) => accumulator + currentValue) / playersRatings.length

    await teamModels.updateOne({name: team.name}, {rating: averageRating})
  })
}

function checkTime() {
  const now = new Date();
  const hours = now.getHours();

  if (hours === 0) {
    refreshChatRatings();
    refreshTeamsRatings();
  }
}

export const start = () => {
  checkTime();
  setInterval(checkTime, 3600000);
};

export default start;
