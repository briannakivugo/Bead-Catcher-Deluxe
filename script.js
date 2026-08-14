Project Name
Save
Run
User profile avatar

286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
⌄
⌄
⌄
⌄
  for(let tree of forestTrees){

    triangle(
      tree.x,
      height - 100,
      tree.x + 25,
      height - 100 - tree.height,
      tree.x + 50,
      height - 100
    );

  }

  // Foreground forest
  fill(15,40,30);

  for(let tree of foregroundTrees){

    // Tree trunk
    fill(45,30,20);

    rect(
      tree.x + 32,
      height - 100 - tree.height + 80,
      16,
      tree.height - 80
    );

    // Tree foliage
    fill(15,40,30);

    triangle(
      tree.x,
      height - 100,
      tree.x + 40,
      height - 100 - tree.height,
      tree.x + 80,
      height - 100
    );

  }

// =============================
// FOREST MIST
// =============================

function drawForestMist(){

  noStroke();

  fill(255,255,255,25);

  rect(
    0,
    height - 220,
    width,
    120
  );

}
 

  
// Foreground forest

fill(15,40,30);

for(let tree of foregroundTrees){

  triangle(
    tree.x,
    height - 100,
    tree.x + 40,
    height - 100 - tree.height,
    tree.x + 80,
    height - 100
  );

}

}

// =============================
// GAME

    Preview

    Console

No logs received yet

