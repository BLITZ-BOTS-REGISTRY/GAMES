import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { TwoZeroFourEight } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder()
    .setName('2048')
    .setDescription('Play 2048 in Discord'),

  action: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) {
        await interaction.editReply({ content: 'This command can only be used in a text channel!', ephemeral: true });
        return;
      }

      await interaction.editReply({ content: 'Starting 2048 game...', ephemeral: true });

      const game = new TwoZeroFourEight({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: '2048',
          color: '#5865F2',
        },
        emojis: {
          up: '⬆️',
          down: '⬇️',
          left: '⬅️',
          right: '➡️',
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      game.startGame();
    } catch (error) {
      console.error('Error starting 2048 game:', error);
      await interaction.editReply({ content: 'An error occurred while starting the game. Please try again later.', ephemeral: true });
    }
  },
};
