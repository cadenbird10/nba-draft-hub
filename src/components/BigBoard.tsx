import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from '@mui/material';
import { bio, scoutRankings } from '../data/playersData';
import type { ScoutRanking } from '../data/playersData';

const SCOUTS = [
  'ESPN Rank',
  'Sam Vecenie Rank',
  "Kevin O'Connor Rank",
  'Kyle Boone Rank',
  'Gary Parrish Rank',
];

const getAverageRank = (ranking: ScoutRanking): number => {
  const ranks = Object.entries(ranking)
    .filter(([key]) => key !== 'playerId' && ranking[key] !== undefined && ranking[key] !== null)
    .map(([, value]) => Number(value));
  const total = ranks.reduce((sum, val) => sum + val, 0);
  return ranks.length ? total / ranks.length : Infinity;
};

const BigBoard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scoutFilter, setScoutFilter] = useState('');
  const [sortBy, setSortBy] = useState('avgRank');
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const handleCheckboxChange = (playerId: number) => {
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) return prev.filter(id => id !== playerId);
      if (prev.length < 2) return [...prev, playerId];
      return prev;
    });
  };

  const playersWithRankings = bio
    .map((player) => {
      const ranking = scoutRankings.find((r) => r.playerId === player.playerId);
      return {
        ...player,
        ranking,
        avgRank: ranking ? getAverageRank(ranking) : Infinity,
      };
    })
    .filter((player) =>
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((player) => {
      if (!scoutFilter) return true;
      const rank = player.ranking?.[scoutFilter];
      return typeof rank === 'number' && rank <= 10;
    })
    .sort((a, b) => {
      if (sortBy === 'heightAsc') return a.height - b.height;
      if (sortBy === 'heightDesc') return b.height - a.height;

      if (sortBy === 'ageAsc') {
        return new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime(); // younger first
      }
      if (sortBy === 'ageDesc') {
        return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(); // older first
      }

      // Default sort by average rank
      return a.avgRank - b.avgRank;
    });


  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" gutterBottom>
        NBA Draft Big Board
      </Typography>

      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 3,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          borderRadius: 1,
        }}
      />

      <FormControl sx={{ mb: 3, width: '100%', maxWidth: 400, backgroundColor: 'white', borderRadius: 1 }}>
        <InputLabel>Filter by Scout</InputLabel>
        <Select
          value={scoutFilter}
          label="Filter by Scout"
          onChange={(e) => setScoutFilter(e.target.value)}
        >
          <MenuItem value="">All Scouts</MenuItem>
          {SCOUTS.map((scout) => (
            <MenuItem key={scout} value={scout}>
              Top 10: {scout}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 4, width: '100%', maxWidth: 400, backgroundColor: 'white', borderRadius: 1 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="avgRank">Average Rank</MenuItem>
          <MenuItem value="heightAsc">Height: Shortest to Tallest</MenuItem>
          <MenuItem value="heightDesc">Height: Tallest to Shortest</MenuItem>
          <MenuItem value="ageAsc">Age: Youngest to Oldest</MenuItem>
          <MenuItem value="ageDesc">Age: Oldest to Youngest</MenuItem>
        </Select>
      </FormControl>

      {selectedPlayers.length === 2 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => navigate(`/compare?ids=${selectedPlayers.join(',')}`)}
        >
          Compare Players
        </Button>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        sx={{ maxWidth: '1400px', width: '100%' }}
      >
        {playersWithRankings.map((player) => (
          <Box
            key={player.playerId}
            sx={{
              width: {
                xs: '100%',
                sm: '45%',
                md: '30%',
              },
              minWidth: 280,
              maxWidth: 350,
              flexGrow: 1,
              boxSizing: 'border-box',
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent onClick={() => navigate(`/player/${player.playerId}`)}>
                <Box display="flex" alignItems="center" gap={3} mb={2}>
                  <Avatar
                    src={player.photoUrl}
                    alt={`${player.firstName} ${player.lastName}`}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {player.firstName} {player.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {player.currentTeam} | Avg Rank: {player.avgRank.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  {SCOUTS.map((scout) => {
                    const rank = player.ranking?.[scout];
                    const color =
                      rank === undefined || rank === null
                        ? 'text.secondary'
                        : Number(rank) < player.avgRank - 2
                        ? 'green'
                        : Number(rank) > player.avgRank + 2
                        ? 'red'
                        : 'inherit';

                    return (
                      <Typography key={scout} variant="body2" sx={{ color }}>
                        {scout}: {rank !== undefined && rank !== null ? `#${rank}` : 'Did not rank'}
                      </Typography>
                    );
                  })}
                </Box>
              </CardContent>

              <Box p={2}>
                <Checkbox
                  checked={selectedPlayers.includes(player.playerId)}
                  onChange={() => handleCheckboxChange(player.playerId)}
                  disabled={
                    !selectedPlayers.includes(player.playerId) && selectedPlayers.length >= 2
                  }
                />
                <Typography variant="caption">Compare</Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BigBoard;
