import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { Hangman } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play Hangman in Discord'),

  action: async (client, interaction, config) => {
    try {
      await interaction.deferReply();

      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) {
        await interaction.editReply({ content: 'This command can only be used in a text channel!', ephemeral: true });
        return;
      }

      await interaction.editReply({ content: 'Starting Hangman game...', ephemeral: true });

      const game = new Hangman({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Hangman',
          color: '#5865F2',
        },
        hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
        timeoutTime: 60000,
        theme: config.theme,
        winMessage: 'You won! The word was **{word}**.',
        loseMessage: 'You lost! The word was **{word}**.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      game.startGame();
    } catch (error) {
      console.error('Error starting Hangman game:', error);
      await interaction.editReply({ content: 'An error occurred while starting the game. Please try again later.', ephemeral: true });
    }
  },
};
