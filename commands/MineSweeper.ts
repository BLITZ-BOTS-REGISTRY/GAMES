import { SlashCommandBuilder, TextChannel } from 'npm:discord.js';
import { Minesweeper } from 'npm:discord-gamecord';

export default {
  data: new SlashCommandBuilder()
    .setName('minesweeper')
    .setDescription('Play Minesweeper in Discord'),

  action: async (client, interaction, config) => {
    try {
      await interaction.deferReply();

      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) {
        await interaction.editReply({ content: 'This command can only be used in a text channel!', ephemeral: true });
        return;
      }

      await interaction.editReply({ content: 'Starting Minesweeper game...', ephemeral: true });

      const game = new Minesweeper({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Minesweeper',
          color: '#5865F2',
          description: 'Click on the buttons to reveal the blocks except mines.'
        },
        emojis: { flag: '🚩', mine: '💣' },
        mines: config.mines,
        timeoutTime: 60000,
        winMessage: 'You won the Game! You successfully avoided all the mines.',
        loseMessage: 'You lost the Game! Be aware of the mines next time.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      game.startGame();
    } catch (error) {
      console.error('Error starting Minesweeper game:', error);
      await interaction.editReply({ content: 'An error occurred while starting the game. Please try again later.', ephemeral: true });
    }
  },
};
