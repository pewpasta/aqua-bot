const { createAnnounceEmbed } = require('../utils');

module.exports = {
  name: 'now',
  description:
    'Queues a song and adds it to the front of the queue in the current voice channel.',
  usage:
    '.now https://www.youtube.com/watch?v=fE2h3lGlOsk - Adds the Youtube video to the front of the queue.\n.now wannabe itzy - Adds the Youtube video corresponding to Wannabe Itzy to the front of the queue.\nWorks for Spotify playlists and tracks as well as Youtube playlists.',
  async execute(message, args) {
    if (args.length === 0) {
      const embed = createAnnounceEmbed(
        'Incorrect Usage',
        'Incorrect usage, $now [youtube link or search query]',
        '#ffbaba'
      );
      message.inlineReply(embed);
      return;
    }
    const guild = this.ac.getGuildObject(message.guild.id);
    const voiceID = message.member.voice.id;
    if (!voiceID) {
      return;
    }

    guild.audioPlayer.queueAudio(args, message, true);
  },
};
