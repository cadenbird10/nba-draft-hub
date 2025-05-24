// src/components/PlayerProfile.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Card, CardContent, TextField, Paper, ToggleButton, ToggleButtonGroup, Table, TableBody, TableCell, TableRow,} from '@mui/material';
import {
  bio,
  scoutingReports,
  seasonLogs,
  measurements,
} from '../data/playersData';
import type { ScoutingReport } from '../data/playersData';
import { v4 as uuidv4 } from 'uuid';

const PlayerProfile: React.FC = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const numericId = Number(playerId);

  const player = bio.find((p) => p.playerId === numericId);
  const playerStats = seasonLogs.find((s) => s.playerId === numericId);
  const playerMeasurements = measurements.find((m) => m.playerId === numericId);

  const initialReports = scoutingReports.filter((r) => r.playerId === numericId);
  const [reports, setReports] = useState<ScoutingReport[]>(initialReports);
  const [newReport, setNewReport] = useState('');
  const [scoutName, setScoutName] = useState('');
  const [statMode, setStatMode] = useState<'perGame' | 'totals'>('perGame');
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showFullStats, setShowFullStats] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.trim() || !scoutName.trim()) return;
    const newEntry: ScoutingReport = {
      playerId: numericId,
      scout: scoutName,
      report: newReport,
      reportId: uuidv4(),
    };
    setReports((prev) => [newEntry, ...prev]);
    setNewReport('');
    setScoutName('');
  };

  const handleStatModeChange = (_: any, newMode: 'perGame' | 'totals') => {
    if (newMode) setStatMode(newMode);
  };

  const calculateTotals = (stat: number, games: number) =>
    (stat * games).toFixed(1);

  if (!player) {
    return (
      <Box p={2}>
        <Typography variant="h5">Player not found</Typography>
        <Button onClick={() => navigate('/')}>Back to Big Board</Button>
      </Box>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Button
        variant="outlined"
        sx={{
          alignSelf: 'flex-start',
          mb: 3,
          backgroundColor: 'white',
          color: 'black',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
        onClick={() => navigate('/')}
      >
        ← Back to Big Board
      </Button>


      <Card sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={4} mb={4}>
            <Avatar src={player.photoUrl} sx={{ width: 140, height: 140 }} />
            <Box>
              <Typography variant="h3" gutterBottom>
                {player.firstName} {player.lastName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {player.currentTeam} | {player.league}
              </Typography>
            </Box>
          </Box>

          <Typography><strong>Height:</strong> {player.height} in</Typography>
          <Typography><strong>Weight:</strong> {player.weight} lbs</Typography>
          <Typography><strong>Birthdate:</strong> {player.birthDate}</Typography>
          <Typography><strong>Hometown:</strong> {player.homeTown}, {player.homeState}</Typography>
          <Typography><strong>High School:</strong> {player.highSchool}, {player.highSchoolState}</Typography>
          <Typography><strong>Nationality:</strong> {player.nationality}</Typography>
        </CardContent>
      </Card>

      {/* Toggle: Per-game vs Totals */}
      <Box sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        <Typography variant="h5" gutterBottom>Season Stats</Typography>

      <ToggleButtonGroup
        color="primary"
        value={statMode}
        exclusive
        onChange={handleStatModeChange}
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
      >
        <ToggleButton value="perGame">Per Game</ToggleButton>
        <ToggleButton value="totals">Season Totals</ToggleButton>
      </ToggleButtonGroup>


        {playerStats ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Games Played</strong></TableCell>
                <TableCell>{playerStats.GP}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Points</strong></TableCell>
                <TableCell>
                  {statMode === 'perGame'
                    ? playerStats.PTS.toFixed(1)
                    : calculateTotals(playerStats.PTS, playerStats.GP)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Rebounds</strong></TableCell>
                <TableCell>
                  {statMode === 'perGame'
                    ? playerStats.TRB.toFixed(1)
                    : calculateTotals(playerStats.TRB, playerStats.GP)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Assists</strong></TableCell>
                <TableCell>
                  {statMode === 'perGame'
                    ? playerStats.AST.toFixed(1)
                    : calculateTotals(playerStats.AST, playerStats.GP)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Typography color="text.secondary">No stats available.</Typography>
        )}
      </Box>

      {/* Toggle: Full Season Stats */}
      <Box sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        <ToggleButton
          value="check"
          selected={showFullStats}
          onChange={() => setShowFullStats((prev) => !prev)}
          sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
        >
          {showFullStats ? 'Hide Full Stats' : 'Show Full Season Stats'}
        </ToggleButton>


        {showFullStats && playerStats ? (
          <Table>
            <TableBody>
              {Object.entries(playerStats).map(([key, value]) =>
                key !== 'playerId' ? (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{typeof value === 'number' ? value.toFixed(1) : value}</TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        ) : (
          showFullStats && (
            <Typography color="text.secondary">No full stats available.</Typography>
          )
        )}
      </Box>

      {/* Toggle: Measurements */}
      <Box sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        <Typography variant="h5" gutterBottom>Measurements</Typography>

      <ToggleButton
        value="check"
        selected={showMeasurements}
        onChange={() => setShowMeasurements((prev) => !prev)}
        sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
      >
        {showMeasurements ? 'Hide Measurements' : 'Show Measurements'}
      </ToggleButton>


        {showMeasurements && playerMeasurements ? (
          <Table>
            <TableBody>
              {Object.entries(playerMeasurements).map(([key, value]) =>
                key !== 'playerId' ? (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value !== null ? value : 'N/A'}</TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        ) : (
          showMeasurements && (
            <Typography color="text.secondary">No measurement data available.</Typography>
          )
        )}
      </Box>

      {/* Scouting Report Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 900,
            width: '100%',
            mb: 4,
            backgroundColor: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>Add a Scouting Report</Typography>
          <TextField
            fullWidth
            label="Scout Name"
            variant="outlined"
            value={scoutName}
            onChange={(e) => setScoutName(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white' }}
          />
          <TextField
            fullWidth
            label="Report"
            multiline
            minRows={4}
            variant="outlined"
            value={newReport}
            onChange={(e) => setNewReport(e.target.value)}
            sx={{ mb: 2, backgroundColor: 'white' }}
          />
          <Button type="submit" variant="contained">Submit Report</Button>
        </Box>

        {/* Report List */}
        <Box sx={{ maxWidth: 900, width: '100%' }}>
          <Typography variant="h5" gutterBottom>Scouting Reports</Typography>
          {reports.length === 0 ? (
            <Typography color="text.secondary">No reports yet.</Typography>
          ) : (
            reports.map((r) => (
              <Paper
                key={r.reportId}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">{r.scout}</Typography>
                <Typography variant="body1">{r.report}</Typography>
              </Paper>
            ))
          )}
        </Box>

    </Box>
  );
};

export default PlayerProfile;
