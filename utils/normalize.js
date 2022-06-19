

export const MUSIC_STATES = {
    0: "purchased",
    1: "rejected",
    2: "pending"
  }
  
  
  export const normalizeOwnedMusic = web3 => (music, ownedMusic) => {
    return {
      ...music,
      title1: music.title,
      ownedMusicId: ownedMusic.id,
      proof: ownedMusic.proof,
      owned: ownedMusic.owner,
      price: web3.utils.fromWei(ownedMusic.price),
      state: MUSIC_STATES[ownedMusic.state]
    }
  }