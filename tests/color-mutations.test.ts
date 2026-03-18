import { test } from 'uvu'
import assert from 'uvu/assert'

import { colorMutations } from "../src";

test("lighten color - zero percentage", () => {
  const output = colorMutations.lighten("#ffffff", 0);
  assert.equal("#" +output, "#ffffff")
})

test("lighten color - #f1d11f, full", () => {
  const output = colorMutations.lighten("#f1d11f", 100)
  assert.equal("#" + output, "#ffffff")
})

test("darken color - zero percentage", () => {
  const output = colorMutations.darken("#ffffff", 0);
  assert.equal("#" + output, "#ffffff")
})

test("darken color - #f1d11f, full", () => {
  const output = colorMutations.darken("#f1d11f", 100)
  assert.equal("#" + output, "#000000")
})


test.run()
