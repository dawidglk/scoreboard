import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Head from "next/head";

const rows = [
  {
    key: 1,
    players1: ["Ewelina", "Dawid"],
    players2: ["Kuba", "Krzysztof"],
    result: "6:2 7:6",
  },
  {
    key: 2,
    players1: ["Ewelina", "Dawid"],
    players2: ["Adam", "Andrzej"],
    result: "6:2 7:6",
  },
  {
    key: 3,
    players1: ["Ewelina", "Dawid"],
    players2: ["Ewelina", "Sławek"],
    result: "6:1 3:6 10:7",
  },
  {
    key: 4,
    players1: ["Ewelina", "Sławek"],
    players2: ["Jerzy", "Maksymilian"],
    result: "1:6 3:6",
  },
  {
    key: 5,
    players1: ["Ewelina", "Sławek"],
    players2: ["Adam", "Andrzej"],
    result: "6:4 2:6 9:10",
  },
  {
    key: 6,
    players1: ["Ewelina", "Sławek"],
    players2: ["Staszek", "Artur"],
    result: "4:6 3:6",
  },
  {
    key: 7,
    players1: ["Staszek", "Artur"],
    players2: ["Adam", "Andrzej"],
    result: "7:5 7:6",
  },
  {
    key: 8,
    players1: ["Jerzy", "Maksymilian"],
    players2: ["Staszek", "Artur"],
    result: "6:2 6:3",
  },
  {
    key: 9,
    players1: ["Jerzy", "Maksymilian"],
    players2: ["Kuba", "Krzysztof"],
    result: "6:4 6:2",
  },
  {
    key: 10,
    players1: ["Jerzy", "Maksymilian"],
    players2: ["Adam", "Andrzej"],
    result: "6:2 6:4",
  },
];

// Function to calculate win points and matches played for each team
const calculateTeamPoints = (matchResults) => {
  const pointsMap = {};
  const matchesPlayedMap = {};

  matchResults.forEach((match) => {
    const sets = match.result
      .split(" ")
      .map((set) => set.split(":").map(Number));
    const team1Name = match.players1.join("-");
    const team2Name = match.players2.join("-");

    // Count the number of sets won by each team
    let team1Sets = 0;
    let team2Sets = 0;

    sets.forEach(([score1, score2]) => {
      if (score1 > score2) {
        team1Sets += 1;
      } else if (score2 > score1) {
        team2Sets += 1;
      }
    });

    // Determine the winner based on the majority of sets won
    if (team1Sets > team2Sets) {
      pointsMap[team1Name] = (pointsMap[team1Name] || 0) + 1;
    } else if (team2Sets > team1Sets) {
      pointsMap[team2Name] = (pointsMap[team2Name] || 0) + 1;
    } else {
      // It's a tie, both teams get a point
      pointsMap[team1Name] = (pointsMap[team1Name] || 0) + 1;
      pointsMap[team2Name] = (pointsMap[team2Name] || 0) + 1;
    }

    matchesPlayedMap[team1Name] = (matchesPlayedMap[team1Name] || 0) + 1;
    matchesPlayedMap[team2Name] = (matchesPlayedMap[team2Name] || 0) + 1;
  });

  return { pointsMap, matchesPlayedMap };
};

export default function HomePage() {
  const { pointsMap, matchesPlayedMap } = calculateTeamPoints(rows);

  // Convert the pointsMap and matchesPlayedMap objects into an array of objects for sorting
  const teamPointsArray = Object.keys(pointsMap).map((team) => ({
    team,
    points: pointsMap[team],
    matchesPlayed: matchesPlayedMap[team],
  }));

  // Include teams with 0 points in the array
  Object.keys(matchesPlayedMap)
    .filter((team) => !pointsMap[team])
    .forEach((team) => {
      teamPointsArray.push({
        team,
        points: 0,
        matchesPlayed: matchesPlayedMap[team],
      });
    });

  // Sort the array based on points (from higher to lower)
  teamPointsArray.sort((a, b) => b.points - a.points);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper} sx={{ maxWidth: "900px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Gracze</TableCell>
                <TableCell align="right">Wynik</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div>
                      {row.players1.join("-")} / {row.players2.join("-")}
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", m: "20px" }}>
        <TableContainer component={Paper} sx={{ maxWidth: "400px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Klasyfikacja ogólna
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Drużyna</TableCell>
                <TableCell align="right">Punkty</TableCell>
                <TableCell align="right">Mecze</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamPointsArray.map((teamData) => (
                <TableRow
                  key={teamData.team}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{teamData.team}</TableCell>
                  <TableCell align="right">{teamData.points}</TableCell>
                  <TableCell align="right">{teamData.matchesPlayed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
