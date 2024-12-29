import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { Wordle } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription('Play Wordle in Discord'),

  action: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) {
        await interaction.editReply({ content: 'This command can only be used in a text channel!', ephemeral: true });
        return;
      }

      await interaction.editReply({ content: 'Starting Wordle game...', ephemeral: true });

      const game = new Wordle({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Wordle',
          color: '#5865F2',
        },
        customWord: null,
        timeoutTime: 60000,
        winMessage: 'You won! The word was **{word}**.',
        loseMessage: 'You lost! The word was **{word}**.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      game.startGame();
    } catch (error) {
      console.error('Error starting Wordle game:', error);
      await interaction.editReply({ content: 'An error occurred while starting the game. Please try again later.', ephemeral: true });
    }
  },
};
