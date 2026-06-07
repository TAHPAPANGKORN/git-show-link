class GitShowLink < Formula
  desc "Get clickable HTTPS commit links from SSH remotes"
  homepage "https://github.com/TAHPAPANGKORN/git-show-link"
  url "https://registry.npmjs.org/git-show-link/-/git-show-link-1.3.0.tgz"
  sha256 "3a11fc07f18618ce16fb26158de54fed92038ec92fa32ff4d1714ea25233d95e"
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
