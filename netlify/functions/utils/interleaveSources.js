function interleaveStories(allStoryArrays, maxStories = 20) {
  const result = [];
  let index = 0;

  while (result.length < maxStories) {
    let added = false;

    for (const stories of allStoryArrays) {
      if (index < stories.length) {
        result.push(stories[index]);
        added = true;
        if (result.length >= maxStories) break;
      }
    }

    if (!added) break; // Nothing left to add
    index++;
  }

  return result;
}

module.exports = interleaveStories;
