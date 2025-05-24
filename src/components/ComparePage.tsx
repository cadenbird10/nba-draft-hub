// src/components/ComparePage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bio, seasonLogs } from '../data/playersData';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ComparePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',').map(Number) : [];

  const players = bio.filter(p => ids.includes(p.playerId));
  const stats = seasonLogs.filter(log => ids.includes(log.playerId));

  const getLatestStat = (playerId: number) =>
    stats.filter(s => s.playerId === playerId).sort((a, b) => b.Season - a.Season)[0];

  const statLabels: { key: keyof typeof stats[0]; label: string }[] = [
    { key: 'GP', label: 'Games Played' },
    { key: 'MP', label: 'Minutes/Game' },
    { key: 'PTS', label: 'Points/Game' },
    { key: 'AST', label: 'Assists/Game' },
    { key: 'TRB', label: 'Rebounds/Game' },
    { key: 'FG%', label: 'FG%' },
    { key: '3P%', label: '3P%' },
    { key: 'FTP', label: 'FT%' },
  ];

  return (
    <Box p={4}>
      <Button variant="outlined" onClick={() => navigate('/')}>
        ← Back to Big Board
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Player Comparison
      </Typography>

      <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap" mb={4}>
        {players.map(player => (
          <Card key={player.playerId} sx={{ width: 320 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Avatar src={player.photoUrl} sx={{ width: 100, height: 100 }} />
                <Typography variant="h6">{player.firstName} {player.lastName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {player.currentTeam}
                </Typography>
              </Box>
              <Typography mt={2}><strong>Height:</strong> {player.height} in</Typography>
              <Typography><strong>Weight:</strong> {player.weight} lbs</Typography>
              <Typography><strong>Birthdate:</strong> {player.birthDate}</Typography>
              <Typography><strong>Hometown:</strong> {player.homeTown}, {player.homeState}</Typography>
              <Typography><strong>High School:</strong> {player.highSchool}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h5" gutterBottom align="center">
        Season Stats Comparison (Most Recent)
      </Typography>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              {players.map(p => (
                <TableCell key={p.playerId}>{p.firstName} {p.lastName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statLabels.map(({ key, label }) => (
              <TableRow key={key}>
                <TableCell>{label}</TableCell>
                {players.map(p => {
                  const latest = getLatestStat(p.playerId);
                  const value = latest ? latest[key] : 'N/A';
                  return <TableCell key={p.playerId}>{typeof value === 'number' ? value.toFixed(1) : value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ComparePage;
