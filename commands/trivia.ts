import { SlashCommandBuilder, TextChannel } from 'discord.js';
import { Trivia } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play Trivia in Discord'),

  action: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const channel = interaction.channel;
      if (!(channel instanceof TextChannel)) {
        await interaction.editReply({ content: 'This command can only be used in a text channel!', ephemeral: true });
        return;
      }

      await interaction.editReply({ content: 'Starting Trivia game...', ephemeral: true });

      const game = new Trivia({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Trivia',
          color: '#5865F2',
          description: 'You have 60 seconds to guess the answer.'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        trueButtonStyle: 'SUCCESS',
        falseButtonStyle: 'DANGER',
        mode: config.mode,  
        difficulty: config.difficulty,  
        winMessage: 'You won! The correct answer is {answer}.',
        loseMessage: 'You lost! The correct answer is {answer}.',
        errMessage: 'Unable to fetch question data! Please try again.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      game.startGame();
    } catch (error) {
      console.error('Error starting Trivia game:', error);
      await interaction.editReply({ content: 'An error occurred while starting the game. Please try again later.', ephemeral: true });
    }
  },
};
