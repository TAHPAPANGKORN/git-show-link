class GitShowLink < Formula
  desc "Get clickable HTTPS commit links from SSH remotes"
  homepage "https://github.com/TAHPAPANGKORN/git-show-link"
  url "https://registry.npmjs.org/git-show-link/-/git-show-link-1.2.3.tgz"
  sha256 "b3d86c4f309b54ab5afb9ab7830987180bd0ef37d809da542e9e93d7bc1d357e"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "git show-link version:", shell_output("#{bin}/git-show-link --version")
  end
end
